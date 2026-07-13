import {useEffect, useMemo, useState} from "react";
import {useSelector} from "react-redux";
import {checkSupportKey, sendSupportRequest} from "../../../Context/actions/support";
import {
    supportCheckStateSelector,
    supportErrorSelector,
    supportProductSelector,
    supportSendStateSelector,
    supportSentSelector
} from "../../../Context/selectors";
import {resetSupport} from "../../../Context/reducer/globalSlice";
import {useAppDispatch} from "../../../store/hooks";
import {SupportField} from "./SupportField";
import {BodyFormStyled} from "./styled";

const SENT_REQUEST_PREFIX = "sent:";
const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;
const LICENSE_KEY_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

const getSentRequestTimestamp = (licenseKey: string) => {
    if (typeof window === "undefined")
        return null;

    const value = window.localStorage.getItem(`${SENT_REQUEST_PREFIX}${licenseKey}`);
    if (!value)
        return null;

    const timestamp = Number(value);
    if (Number.isNaN(timestamp))
        return null;

    if (Date.now() - timestamp >= SEVEN_DAYS_MS) {
        window.localStorage.removeItem(`${SENT_REQUEST_PREFIX}${licenseKey}`);
        return null;
    }

    return timestamp;
};

const setSentRequestTimestamp = (licenseKey: string) => {
    if (typeof window === "undefined")
        return;

    window.localStorage.setItem(`${SENT_REQUEST_PREFIX}${licenseKey}`, String(Date.now()));
};

export const BodyForm = () => {
    const dispatch = useAppDispatch();
    const product = useSelector(supportProductSelector);
    const checkState = useSelector(supportCheckStateSelector);
    const sendState = useSelector(supportSendStateSelector);
    const supportError = useSelector(supportErrorSelector);
    const supportSent = useSelector(supportSentSelector);

    const [dataState, setDataState] = useState({
        key: "",
        title: "",
        des: "",
        productId: 0
    });

    const [localError, setLocalError] = useState("");

    const hasProduct = useMemo(() => product !== undefined, [product]);
    const checking = checkState === "pending";
    const sending = sendState === "pending";
    const activeError = localError || supportError;
    const canEditKey = !checking && !hasProduct;
    const canCheck = canEditKey && !activeError;

    useEffect(() => {
        return () => {
            dispatch(resetSupport());
        };
    }, [dispatch]);

    useEffect(() => {
        if (!product)
            return;

        setDataState((prev) => ({
            ...prev,
            key: product.key,
            productId: Number(product.id) || 0
        }));
    }, [product]);

    const setValue = (name: "key" | "title" | "des", value: string) => {
        setDataState((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const onCheck = async () => {
        const licenseKey = dataState.key.trim();

        if (!licenseKey) {
            setLocalError("License key is required");
            return;
        }

        if (!LICENSE_KEY_PATTERN.test(licenseKey)) {
            setLocalError("License key has an invalid format");
            return;
        }

        setLocalError("");
        await dispatch(checkSupportKey({
            license_key: licenseKey
        }));
    };

    const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key !== "Enter")
            return;

        event.preventDefault();

        if (canCheck)
            void onCheck();
    };

    const onSend = async () => {
        const licenseKey = dataState.key.trim();

        if (getSentRequestTimestamp(licenseKey)) {
            setLocalError("You already sent a request. You can send a new one after 7 days.");
            return;
        }

        if (!dataState.title.trim()) {
            setLocalError("Problem title is required");
            return;
        }

        if (!dataState.des.trim()) {
            setLocalError("Description is required");
            return;
        }

        setLocalError("");
        const resultAction = await dispatch(sendSupportRequest({
            license_key: licenseKey,
            name: dataState.title.trim(),
            description: dataState.des.trim()
        }));

        if (sendSupportRequest.fulfilled.match(resultAction)) {
            setSentRequestTimestamp(licenseKey);
        }
    };

    return (
        <BodyFormStyled data-checked={hasProduct} data-sent={supportSent}>
            <h1 className={"support-title"}>Support</h1>

            <div className={"key-step"}>
                <div className={"support-actions"}>
                    <div className={"support-input-wrap"}>
                        <input
                            value={dataState.key}
                            onChange={(event) => setValue("key", event.target.value)}
                            onKeyDown={onKeyDown}
                            placeholder={"Key product"}
                            disabled={!canEditKey}
                        />
                    </div>

                    <button type={"button"} onClick={onCheck} disabled={!canCheck}>
                        {checking ? "Checking..." : "Check"}
                    </button>
                </div>
            </div>

            <div className={"support-product"}>
                {product?.image ? (
                    <img src={product.image} alt={product.name} className={"product-image"} />
                ) : (
                    <div className={"product-image placeholder"} />
                )}

                <div className={"product-copy"}>
                    <h2>{product?.name}</h2>
                    <p>Product found by your license key. Describe the problem and send the request.</p>
                    <div className={"product-key"}>{product?.key}</div>
                </div>
            </div>

            <div className={"support-body"}>
                <SupportField
                    label={"Problem title"}
                    value={dataState.title}
                    onChange={(value) => setValue("title", value)}
                    placeholder={"Short problem title"}
                />

                <SupportField
                    label={"Description"}
                    value={dataState.des}
                    onChange={(value) => setValue("des", value)}
                    placeholder={"Describe the issue in detail"}
                    textarea
                />

                <div className={"support-submit-row"}>
                    <button type={"button"} onClick={onSend} disabled={!hasProduct || sending || Boolean(activeError)}>
                        {sending ? "Sending..." : "Send"}
                    </button>
                </div>
            </div>

            {activeError && (
                <div className={"support-message error"}>
                    {activeError}
                </div>
            )}

            {supportSent && (
                <div className={"support-message success"}>
                    Support request sent successfully.
                </div>
            )}

            {!hasProduct && (
                <a className={"support-mail"} href={"mailto:vrchat@denishik.io"}>
                    vrchat@denishik.io
                </a>
            )}
        </BodyFormStyled>
    );
};
