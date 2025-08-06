
let customers = [];
let editingIndex = null;

function login(event) {
    event.preventDefault();
    const user = document.getElementById('username').value;
    const pass = document.getElementById('password').value;
    if (user === 'admin' && pass === '123456') {
        window.location.href = 'dashboard.html';
    } else {
        alert('Sai tài khoản hoặc mật khẩu!');
    }
}

function showSection(name) {
    let content = document.getElementById("content");
    switch (name) {
        case 'create':
            content.innerHTML = `
                <h3>Tạo Mới Khách Hàng</h3>
                <form onsubmit="addCustomer(event)">
                    <input placeholder='Số hợp đồng' id='sohd' required><br>
                    <input placeholder='Họ và tên' id='hoten' required><br>
                    <input placeholder='Số điện thoại' id='sdt' required><br>
                    <select id='cavet'>
                        <option value='Gốc'>Gốc</option>
                        <option value='Photo'>Photo</option>
                    </select><br>
                    <input placeholder='Ngày Upp' id='ngayupp' type='date'><br>
                    <input placeholder='Ngày Gửi' id='ngaygui' type='date'><br>
                    <input placeholder='Ngày thanh toán' id='ngaytt' type='date'><br>
                    <button type="submit">Lưu</button>
                </form>`;
            break;
        case 'list':
            loadCustomers();
            break;
        case 'search':
            content.innerHTML = `<input placeholder='Nhập từ khóa tìm kiếm' oninput='searchCustomer(this.value)'><div id='results'></div>`;
            break;
        case 'unprocessed':
            showUnprocessed();
            break;
        case 'overdue':
            showOverdue();
            break;
        case 'cic':
            content.innerHTML = `<input placeholder='Nhập CCCD' id='cccd'><button onclick='checkCIC()'>Check</button><div id='cic-result'></div>`;
            break;
    }
}

function addCustomer(event) {
    event.preventDefault();
    const data = {
        sohd: document.getElementById('sohd').value,
        hoten: document.getElementById('hoten').value,
        sdt: document.getElementById('sdt').value,
        cavet: document.getElementById('cavet').value,
        ngayupp: document.getElementById('ngayupp').value,
        ngaygui: document.getElementById('ngaygui').value,
        ngaytt: document.getElementById('ngaytt').value
    };

    if (editingIndex !== null) {
        customers[editingIndex] = data;
        editingIndex = null;
    } else {
        customers.push(data);
    }

    alert('Lưu thành công!');
    document.querySelector("form").reset();
}

function loadCustomers() {
    let html = "<h3>Danh Sách Khách Hàng</h3><ul>";
    customers.forEach((c, index) => {
        html += `<li>
            ${c.sohd} - ${c.hoten} - ${c.sdt} - ${c.cavet} - Upp: ${c.ngayupp} - Gửi: ${c.ngaygui} - Thanh toán: ${c.ngaytt}
            <button onclick="editCustomer(${index})">Sửa</button>
            <button onclick="deleteCustomer(${index})">Xoá</button>
        </li>`;
    });
    html += "</ul>";
    document.getElementById("content").innerHTML = html;
}

function editCustomer(index) {
    const c = customers[index];
    editingIndex = index;
    showSection('create');
    setTimeout(() => {
        document.getElementById('sohd').value = c.sohd;
        document.getElementById('hoten').value = c.hoten;
        document.getElementById('sdt').value = c.sdt;
        document.getElementById('cavet').value = c.cavet;
        document.getElementById('ngayupp').value = c.ngayupp;
        document.getElementById('ngaygui').value = c.ngaygui;
        document.getElementById('ngaytt').value = c.ngaytt;
    }, 100);
}

function deleteCustomer(index) {
    if (confirm('Bạn có chắc chắn muốn xoá khách hàng này?')) {
        customers.splice(index, 1);
        loadCustomers();
    }
}

function searchCustomer(keyword) {
    keyword = keyword.toLowerCase();
    const result = customers.filter(c => 
        c.hoten.toLowerCase().includes(keyword) || 
        c.sohd.includes(keyword) || 
        c.sdt.includes(keyword));
    let html = "<ul>";
    for (let c of result) {
        html += `<li>${c.sohd} - ${c.hoten} - ${c.sdt}</li>`;
    }
    html += "</ul>";
    document.getElementById("results").innerHTML = html;
}

function showUnprocessed() {
    let html = "<h3>Cavet Chưa Xử Lý</h3><ul>";
    for (let c of customers) {
        if (!c.ngayupp || !c.ngaygui) {
            html += `<li>${c.sohd} - ${c.hoten} - Upp: ${c.ngayupp || 'Chưa có'} - Gửi: ${c.ngaygui || 'Chưa có'}</li>`;
        }
    }
    html += "</ul>";
    document.getElementById("content").innerHTML = html;
}

function showOverdue() {
    let today = new Date().toISOString().split('T')[0];
    let html = "<h3>Khách Hàng Quá Hạn</h3><ul>";
    for (let c of customers) {
        if (c.ngaytt && c.ngaytt < today) {
            html += `<li>${c.sohd} - ${c.hoten} - Thanh toán: ${c.ngaytt}</li>`;
        }
    }
    html += "</ul>";
    document.getElementById("content").innerHTML = html;
}

function checkCIC() {
    document.getElementById('cic-result').innerText = "Khách hàng không nợ xấu, nợ chú ý.";
}
