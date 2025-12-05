<template>
  <div class="users-page">
    <div class="page-header">
      <h1 class="page-title">Quản lý Người dùng</h1>
      <p class="page-description">
        Quản lý tài khoản độc giả và nhân viên trong hệ thống.
      </p>
    </div>

    <div class="tabs-container">
      <nav class="tabs-nav">
        <button
          @click="activeTab = 'users'"
          :class="['tab-button', activeTab === 'users' ? 'active' : '']"
        >
          Độc giả
        </button>
        <button
          @click="activeTab = 'staff'"
          :class="['tab-button', activeTab === 'staff' ? 'active' : '']"
        >
          Nhân viên & Admin
        </button>
      </nav>
    </div>

    <div class="tab-content">
      <div v-if="activeTab === 'users'">
        <div class="table-card">
          <div class="table-scroll">
            <table class="data-table">
              <thead class="table-header">
                <tr>
                  <th>Họ và Tên</th>
                  <th>Điện thoại</th>
                  <th>Hành động</th>
                </tr>
              </thead>
              <tbody class="table-body">
                <tr v-for="user in users" :key="user._id" class="table-row">
                  <td class="table-cell table-cell-bold">
                    {{ user.hoLot }} {{ user.ten }}
                  </td>
                  <td class="table-cell">{{ user.dienThoai }}</td>
                  <td class="table-cell table-actions">
                    <button
                      @click="deleteUser(user._id, `${user.hoLot} ${user.ten}`)"
                      class="btn-action btn-action-delete"
                      title="Xóa"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="action-icon"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="2"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div v-if="activeTab === 'staff'">
        <div class="content-controls">
          <button @click="openStaffModal()" class="btn-add">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="btn-icon"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            <span>Thêm Admin mới</span>
          </button>
        </div>
        <div class="table-card">
          <div class="table-scroll">
            <table class="data-table">
              <thead class="table-header">
                <tr>
                  <th>Họ và Tên</th>
                  <th>Chức vụ</th>
                  <th>Điện thoại</th>
                  <th>Hành động</th>
                </tr>
              </thead>
              <tbody class="table-body">
                <tr v-for="person in staff" :key="person._id" class="table-row">
                  <td class="table-cell table-cell-bold">
                    {{ person.hoTenNV }}
                  </td>
                  <td class="table-cell">{{ person.chucVu }}</td>
                  <td class="table-cell">{{ person.soDienThoai }}</td>
                  <td class="table-cell table-actions">
                    <button
                      @click="openStaffModal(person)"
                      class="btn-action btn-action-edit"
                      title="Sửa"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="action-icon"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="2"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L15.232 5.232z"
                        />
                      </svg>
                    </button>
                    <button
                      v-if="person._id !== authStore.userId"
                      @click="deleteStaff(person._id, person.hoTenNV)"
                      class="btn-action btn-action-delete"
                      title="Xóa"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="action-icon"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="2"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <div v-if="showStaffModal" class="modal-overlay">
      <div class="modal-content modal-large">
        <h2 class="modal-title">
          {{ editingStaff ? "Chỉnh sửa Nhân viên" : "Thêm Admin mới" }}
        </h2>
        <form @submit.prevent="saveStaff">
          <div class="form-stack">
            <div>
              <label class="form-label">Họ tên nhân viên</label>
              <input
                v-model="staffForm.hoTenNV"
                type="text"
                required
                class="form-input"
              />
            </div>
            <div>
              <label class="form-label">Chức vụ</label>
              <input
                v-model="staffForm.chucVu"
                type="text"
                required
                class="form-input"
              />
            </div>
            <div v-if="!editingStaff">
              <label class="form-label">Email</label>
              <input
                v-model="staffForm.email"
                type="email"
                :required="!editingStaff"
                class="form-input"
              />
            </div>
            <div v-if="!editingStaff">
              <label class="form-label">Mật khẩu</label>
              <input
                v-model="staffForm.password"
                type="password"
                :required="!editingStaff"
                class="form-input"
              />
            </div>
            <div>
              <label class="form-label">Địa chỉ</label>
              <input
                v-model="staffForm.diaChi"
                type="text"
                class="form-input"
              />
            </div>
            <div>
              <label class="form-label">Số điện thoại</label>
              <input
                v-model="staffForm.soDienThoai"
                type="text"
                class="form-input"
              />
            </div>
          </div>
          <div class="modal-actions">
            <button
              @click="showStaffModal = false"
              type="button"
              class="btn-secondary"
            >
              Hủy
            </button>
            <button type="submit" class="btn-primary">Lưu</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import api from "../../services/api";
import { useAuthStore } from "../../stores/auth";

const authStore = useAuthStore();
const activeTab = ref("users");
const users = ref([]);
const staff = ref([]);

const showStaffModal = ref(false);
const editingStaff = ref(null);
const staffForm = ref({
  hoTenNV: "",
  chucVu: "",
  email: "",
  password: "",
  diaChi: "",
  soDienThoai: "",
});

async function fetchData() {
  try {
    const [usersRes, staffRes] = await Promise.all([
      api.get("/management/readers"),
      api.get("/management/staff"),
    ]);
    console.log("Kiểm tra authStore:", authStore);
    users.value = usersRes.data;
    staff.value = staffRes.data;
  } catch (error) {
    console.error("Lỗi khi tải dữ liệu người dùng:", error);
    alert("Không thể tải dữ liệu người dùng.");
  }
}

onMounted(fetchData);

async function deleteUser(userId, userName) {
  if (
    !window.confirm(
      `Bạn có chắc muốn xóa độc giả "${userName}" không? Hành động này sẽ xóa cả tài khoản đăng nhập.`
    )
  )
    return;
  try {
    await api.delete(`/management/readers/${userId}`);
    await fetchData();
    alert("Xóa độc giả thành công!");
  } catch (error) {
    alert(error.response?.data?.message || "Xóa độc giả thất bại.");
  }
}

// --- STAFF/ADMIN LOGIC ---
function openStaffModal(person = null) {
  if (person) {
    editingStaff.value = person;
    staffForm.value = { ...person };
  } else {
    editingStaff.value = null;
    staffForm.value = {
      hoTenNV: "",
      chucVu: "",
      email: "",
      password: "",
      diaChi: "",
      soDienThoai: "",
    };
  }
  showStaffModal.value = true;
}

async function saveStaff() {
  try {
    if (editingStaff.value) {
      await api.put(
        `/management/staff/${editingStaff.value._id}`,
        staffForm.value
      );
    } else {
      await api.post("/management/staff/admin", staffForm.value);
    }
    showStaffModal.value = false;
    await fetchData();
    alert("Lưu thông tin nhân viên thành công!");
  } catch (error) {
    alert(error.response?.data?.message || "Lưu thông tin thất bại.");
  }
}

async function deleteStaff(staffId, staffName) {
  if (
    !window.confirm(
      `Bạn có chắc muốn xóa nhân viên "${staffName}" không? Hành động này sẽ xóa cả tài khoản admin.`
    )
  )
    return;
  try {
    await api.delete(`/management/staff/${staffId}`);
    await fetchData();
    alert("Xóa nhân viên thành công!");
  } catch (error) {
    alert(error.response?.data?.message || "Xóa nhân viên thất bại.");
  }
}
</script>
