const Account = require('../models/Account');
const Staff = require('../models/Staff');
const bcrypt = require('bcryptjs');

async function createDefaultAdmin() {
  const existingAccount = await Account.findOne({ email: 'adminAnhh@library.com' });
  if (existingAccount) return;

  const adminStaff = new Staff({
    hoTenNV: 'System Administrator',
    chucVu: 'Chief Librarian',
    diaChi: 'Main Library Office',
    soDienThoai: '0834573195'
  });

  await adminStaff.save();

  const passwordHash = await bcrypt.hash('162005duyanh', 10);
  const adminAccount = new Account({
    email: 'adminAnhh@library.com',
    password: passwordHash,
    role: 'admin',
    refId: adminStaff.msnv,
    refModel: 'Staff'
  });

  await adminAccount.save();
  console.log('✓ Default admin account initialized');
}

module.exports = createDefaultAdmin;