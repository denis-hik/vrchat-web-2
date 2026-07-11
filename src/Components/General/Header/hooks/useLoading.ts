import {useCallback, useEffect, useRef, useState} from "react";
import {useSelector} from "react-redux";
import {loadingSelector} from "../../../../Context/selectors";

const LOADING_ANIMATION_MS = 6000
const STOPAGREE_ANIMATION_MS = 1000

const useLoading = (animationMs = LOADING_ANIMATION_MS): boolean => {
    const loadingStore = useSelector(loadingSelector);

    const [loading, setLoading] = useState(false)
    const [, setStopAgree] = useState(false);

    const loadingRef = useRef(loading)
    const checkTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const stopAgreeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const clearTimers = useCallback(() => {
        if (checkTimerRef.current) {
            clearTimeout(checkTimerRef.current);
            checkTimerRef.current = null;
        }
        if (stopAgreeTimerRef.current) {
            clearTimeout(stopAgreeTimerRef.current);
            stopAgreeTimerRef.current = null;
        }
    }, []);

    const checkLoading = useCallback(() => {
        if (!loadingRef.current) {
            setLoading(false)
            return;
        }

        checkTimerRef.current = setTimeout(checkLoading, animationMs)
        stopAgreeTimerRef.current = setTimeout(() => setStopAgree(false), STOPAGREE_ANIMATION_MS)
    }, [animationMs])

    useEffect(() => {
        loadingRef.current = loadingStore
        clearTimers()

        if (loadingStore) {
            setLoading(true)
            setStopAgree(true)
            checkTimerRef.current = setTimeout(checkLoading, animationMs)
            stopAgreeTimerRef.current = setTimeout(() => setStopAgree(false), STOPAGREE_ANIMATION_MS)
        } else {
            setStopAgree(false)
            setLoading(false)
        }
    }, [animationMs, checkLoading, clearTimers, loadingStore]);

    useEffect(() => clearTimers, [clearTimers]);

    return loading
}

export default useLoading
