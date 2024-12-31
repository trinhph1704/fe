import { createContext, useState, useEffect } from "react";

// Tạo AuthContext
const AuthContext = createContext({
    auth: null, // Giá trị mặc định
    setAuth: () => {} // Hàm mặc định
});

// Tạo Provider
export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(() => {
        // Kiểm tra dữ liệu đã lưu trong localStorage
        const savedAuth = localStorage.getItem("auth");
        return savedAuth ? JSON.parse(savedAuth) : { user: null };
    });

    // Lưu thông tin người dùng vào localStorage khi auth thay đổi
    useEffect(() => {
        if (auth?.user) {
            localStorage.setItem("auth", JSON.stringify(auth));
        } else {
            localStorage.removeItem("auth");
        }
    }, [auth]);

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
