import { defineStore } from "pinia";

export const useAuthStore = defineStore('auth', {
    state: () => ({
        name: '',
        userId: '',
        token: '',
        role: '',
        userInfo: null,
        isAuthenticated: false,
    }),

    actions: {
        setAuth(data) {
            this.token = data.token;
            this.role = data.role;
            this.userInfo = data.userInfo;
            this.userId = data.userInfo.maDocGia || data.userInfo.msnv;
            this.name = data.userInfo.hoTenNV || data.userInfo.fullName || 'User';
            this.isAuthenticated = true;

            localStorage.setItem('token', this.token);
            localStorage.setItem('role', this.role);
            localStorage.setItem('userId', this.userId);
            localStorage.setItem('name', this.name);
            localStorage.setItem('userInfo', JSON.stringify(this.userInfo));
        },

        clearAuth() {
            this.name = '';
            this.userId = '';
            this.token = '';
            this.role = '';
            this.userInfo = null;
            this.isAuthenticated = false;

            localStorage.clear();
        },

        initFromStorage() {
            const token = localStorage.getItem('token');
            if (token) {
                this.token = token;
                this.isAuthenticated = true;
                this.role = localStorage.getItem('role') || '';
                this.userId = localStorage.getItem('userId') || '';
                this.name = localStorage.getItem('name') || '';
                const userInfoStr = localStorage.getItem('userInfo');
                this.userInfo = userInfoStr ? JSON.parse(userInfoStr) : null;
            }
        }
    }
});