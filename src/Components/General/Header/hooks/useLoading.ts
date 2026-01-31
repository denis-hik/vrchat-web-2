import {useEffect, useRef, useState} from "react";
import {useSelector} from "react-redux";
import {loadingSelector} from "../../../../Context/selectors";

const LOADING_ANIMATION_MS = 6000
const STOPAGREE_ANIMATION_MS = 1000

const useLoading = (animationMs = LOADING_ANIMATION_MS): boolean => {
    const loadingStore = useSelector(loadingSelector);

    const [loading, setLoading] = useState(false)
    const [stopAgree, setStopAgree] = useState(false);

    const loadingRef = useRef(loading)

    const checkLoading = () => {
        if (!loadingRef.current) {
            setLoading(false)
            return;
        }

        setTimeout(checkLoading, animationMs)
        setTimeout(() => setStopAgree(false), STOPAGREE_ANIMATION_MS)
    }

    useEffect(() => {
        if (loadingStore) {
            setLoading(true)
            setStopAgree(true)
            setTimeout(checkLoading, animationMs)
            setTimeout(() => setStopAgree(false), STOPAGREE_ANIMATION_MS)
        } else {
            if (stopAgree) {
                setStopAgree(false)
                setLoading(false)
            }
        }
    }, [loadingStore]);

    useEffect(() => {
        loadingRef.current = loadingStore
    }, [loadingStore]);

    return loading
}

export default useLoading
