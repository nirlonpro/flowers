import { createContext, useEffect, useState, useMemo, useCallback, use } from "react";
import api from "../services/api";

const AuthContext = createContext();

const AUTO_LOGOUT = 15 * 60 * 1000; // 15 Minutes

export function AuthProvider({ children }) {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    /* ==========================================
       Check Authentication
    ========================================== */

    const checkAuth = useCallback(async () => {

        try {

            const res = await api.get("/auth/me");

            if (res.data.success) {

                setUser(res.data);

            }

        } catch {

            setUser(null);

        } finally {

            setLoading(false);

        }

    }, []);

    useEffect(() => {

        checkAuth();

    }, [checkAuth]);

    /* ==========================================
       Login
    ========================================== */

    const login = useCallback(async (password) => {

        const res = await api.post("/auth/login", {
            password,
        });

        await checkAuth();

        return res.data;

    }, [checkAuth]);

    /* ==========================================
       Logout
    ========================================== */

    const logout = useCallback(async () => {

        try {

            await api.post("/auth/logout");

        } catch (error) {

            console.error(error);

        }

        setUser(null);

    }, []);

    /* ==========================================
       Auto Logout After 15 Minutes
    ========================================== */

    useEffect(() => {

        if (!user) return;

        let timer;

        const resetTimer = () => {

            clearTimeout(timer);

            timer = setTimeout(() => {

                logout();

            }, AUTO_LOGOUT);

        };

        window.addEventListener("mousemove", resetTimer);
        window.addEventListener("keydown", resetTimer);
        window.addEventListener("click", resetTimer);
        window.addEventListener("scroll", resetTimer, { passive: true });

        resetTimer();

        return () => {

            clearTimeout(timer);

            window.removeEventListener("mousemove", resetTimer);
            window.removeEventListener("keydown", resetTimer);
            window.removeEventListener("click", resetTimer);
            window.removeEventListener("scroll", resetTimer);

        };

    }, [user, logout]);

    const contextValue = useMemo(() => ({
        user,
        loading,
        login,
        logout,
    }), [user, loading, login, logout]);

    return (

        <AuthContext.Provider value={contextValue}>

            {children}

        </AuthContext.Provider>

    );

}

export const useAuth = () => use(AuthContext);