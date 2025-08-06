function showSection(id) {
  document.querySelectorAll('.section').forEach(s => s.style.display = 'none');
  document.getElementById(id).style.display = 'block';
}

const form = document.getElementById('customerForm');
const table = document.querySelector('#customerTable tbody');

form.onsubmit = function(e) {
  e.preventDefault();
  const inputs = form.querySelectorAll('input, select');
  const row = document.createElement('tr');

  inputs.forEach(input => {
    const td = document.createElement('td');
    td.textContent = input.value;
    row.appendChild(td);
  });

  const actionTd = document.createElement('td');
  actionTd.innerHTML = `<button onclick="this.parentElement.parentElement.remove()">Xoá</button>`;
  row.appendChild(actionTd);

  table.appendChild(row);
  form.reset();
};

function checkCIC() {
  const result = document.getElementById('cicResult');
  result.textContent = 'Khách hàng không nợ xấu, nợ chú ý.';
}
