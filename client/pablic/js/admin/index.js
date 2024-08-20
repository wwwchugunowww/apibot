document.addEventListener("DOMContentLoaded", () => {
  const userList = document.getElementById("userList");
  const userModal = document.getElementById("userModal");
  const deleteModal = document.getElementById("deleteModal");
  const createUserBtn = document.getElementById("createUserBtn");
  const closeModal = document.getElementById("closeModal");
  const closeDeleteModal = document.getElementById("closeDeleteModal");
  const cancelDeleteBtn = document.getElementById("cancelDeleteBtn");
  const confirmDeleteBtn = document.getElementById("confirmDeleteBtn");
  const userForm = document.getElementById("userForm");
  const submitBtn = document.getElementById("submitBtn");
  let currentUserId = null;

  const token = localStorage.getItem("token");
  const registeredBy = "u8803"; // Замените на актуальное значение при необходимости

  if (!token) {
    window.location.href = "/login";
  }

  

const fetchUsers = async () => {
  try {
    const response = await fetch(
      "http://localhost:5000/merchant/api/getmerchant",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const users = await response.json();
    userList.innerHTML = users
      .map((user) => {
        const terminals = Array.isArray(user.terminals)
          ? user.terminals.join(", ")
          : "";
        const watched = Array.isArray(user.watched)
          ? user.watched.join(", ")
          : "";
        return `
            <div class="user-item">
                <span>${user.full_name} (${user.telephone_telegram})</span>
                <button onclick="editUser('${user.id}', '${user.full_name}', '${user.telephone_telegram}', '${user.email}', '${user.company_name}', '${terminals}', '${watched}')">Редактировать</button>
                <button onclick="deleteUser('${user.id}')">Удалить</button>
            </div>
          `;
      })
      .join("");
  } catch (error) {
    console.error("Error fetching users:", error);
  }
};

  const openUserModal = (
    title,
    userId,
    name,
    phone,
    email,
    company,
    terminals,
    watched
  ) => {
    document.getElementById("modalTitle").textContent = title;
    document.getElementById("userId").value = userId || "";
    document.getElementById("userName").value = name || "";
    document.getElementById("userPhone").value = phone || "";
    document.getElementById("userEmail").value = email || "";
    document.getElementById("companyName").value = company || "";
    document.getElementById("userTerminals").value = terminals || "";
    document.getElementById("userWatched").value = watched || "";
    userModal.style.display = "block";
  };

  const closeModals = () => {
    userModal.style.display = "none";
    deleteModal.style.display = "none";
  };

  const handleUserFormSubmit = async (event) => {
    event.preventDefault();
    const userId = document.getElementById("userId").value;
    const userName = document.getElementById("userName").value;
    const userPhone = document.getElementById("userPhone").value;
    const userEmail = document.getElementById("userEmail").value;
    const companyName = document.getElementById("companyName").value;
    const userTerminals = document
      .getElementById("userTerminals")
      .value.split(",")
      .map((term) => term.trim());
    const userWatched = document
      .getElementById("userWatched")
      .value.split(",")
      .map((watched) => watched.trim());
    const now = new Date().toISOString();

    try {
      const userObject = {
        telephone_telegram: userPhone,
        terminals: userTerminals,
        email: userEmail,
        registered_by: registeredBy,
        company_name: companyName,
        full_name: userName,
        watched: userWatched,
        updatedAt: now,
        createdAt: now,
      };

      if (userId) {
        // Обновление пользователя
        await fetch(
          `http://localhost:5000/merchant/userbots/${userId}`,
          //   /api/getmerchant/edit/:id"
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(userObject),
          }
        );
      } else {
        // Создание нового пользователя
        await fetch("http://localhost:5000/merchant/userbots", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(userObject),
        });
      }
      closeModals();
      fetchUsers();
    } catch (error) {
      console.error("Error saving user:", error);
    }
  };

  const handleDeleteUser = async () => {
    try {
      await fetch(`http://localhost:5000/merchant/userbots/${currentUserId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      closeModals();
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  window.editUser = (
    userId,
    name,
    phone,
    email,
    company,
    terminals,
    watched
  ) => {
    currentUserId = userId;
    openUserModal(
      "Редактировать пользователя",
      userId,
      name,
      phone,
      email,
      company,
      terminals,
      watched
    );
  };

  window.deleteUser = (userId) => {
    currentUserId = userId;
    deleteModal.style.display = "block";
  };

  createUserBtn.addEventListener("click", () =>
    openUserModal("Создать пользователя")
  );
  closeModal.addEventListener("click", closeModals);
  closeDeleteModal.addEventListener("click", closeModals);
  cancelDeleteBtn.addEventListener("click", closeModals);
  confirmDeleteBtn.addEventListener("click", handleDeleteUser);
  userForm.addEventListener("submit", handleUserFormSubmit);

  fetchUsers();
});
