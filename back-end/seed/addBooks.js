const mongoose = require('mongoose');
const Book = require('../models/Book');
const Publisher = require('../models/Publisher');

const DB_URL = 'mongodb://localhost:27017/library_management';

// Nhà xuất bản
const publishersData = [
    { maNXB: 1, tenNXB: "NXB Trẻ", dienThoai: "0283.9316.211" },
    { maNXB: 2, tenNXB: "NXB Thế Giới", dienThoai: "0243.8253.841" },
    { maNXB: 3, tenNXB: "NXB Văn Học", dienThoai: "0243.8222.135" },
    { maNXB: 4, tenNXB: "NXB Hội Nhà Văn", dienThoai: "0243.9434.281" },
    { maNXB: 5, tenNXB: "NXB Dân Trí", dienThoai: "0243.7631.381" }
];

// 10 cuốn sách với ảnh bìa thật và NXB tương ứng
const booksData = [
    {
        tenSach: "Đắc Nhân Tâm",
        tacGia: "Dale Carnegie",
        donGia: 89000,
        soQuyen: 15,
        namXuatBan: 2020,
        maNXB: 1,
        hinhAnh: "https://salt.tikicdn.com/cache/280x280/ts/product/7c/15/c0/7c4d0c5a34c4589c28b09ebe2b6d4688.jpg"
    },
    {
        tenSach: "Sapiens: Lược Sử Loài Người",
        tacGia: "Yuval Noah Harari",
        donGia: 198000,
        soQuyen: 12,
        namXuatBan: 2018,
        maNXB: 2,
        hinhAnh: "https://salt.tikicdn.com/cache/280x280/ts/product/b0/7b/55/e5e0c6466d5665d794f6567d92da6c01.jpg"
    },
    {
        tenSach: "Tuổi Trẻ Đáng Giá Bao Nhiêu",
        tacGia: "Rosie Nguyễn",
        donGia: 69000,
        soQuyen: 20,
        namXuatBan: 2019,
        maNXB: 1,
        hinhAnh: "https://salt.tikicdn.com/cache/280x280/ts/product/6f/96/45/39e6f3f52fb4e3c88d95c493ede1e7fc.jpg"
    },
    {
        tenSach: "Càng Bình Tĩnh Càng Hạnh Phúc",
        tacGia: "The School of Life",
        donGia: 119000,
        soQuyen: 10,
        namXuatBan: 2021,
        maNXB: 2,
        hinhAnh: "https://salt.tikicdn.com/cache/280x280/ts/product/cd/30/59/3e5f2e8f5147d31a96cb5e66d1a57e77.jpg"
    },
    {
        tenSach: "Atomic Habits - Thay Đổi Tí Hon",
        tacGia: "James Clear",
        donGia: 149000,
        soQuyen: 18,
        namXuatBan: 2020,
        maNXB: 2,
        hinhAnh: "https://salt.tikicdn.com/cache/280x280/ts/product/e8/d6/17/a5f76e4337cd94dc5a5e0f3f5fb4d45f.jpg"
    },
    {
        tenSach: "Nghĩ Giàu Làm Giàu",
        tacGia: "Napoleon Hill",
        donGia: 95000,
        soQuyen: 14,
        namXuatBan: 2019,
        maNXB: 5,
        hinhAnh: "https://salt.tikicdn.com/cache/280x280/ts/product/79/bf/e4/72c396df92895d19dcb2e88e2557df26.jpg"
    },
    {
        tenSach: "Khéo Ăn Nói Sẽ Có Được Thiên Hạ",
        tacGia: "Trác Nhã",
        donGia: 79000,
        soQuyen: 16,
        namXuatBan: 2020,
        maNXB: 5,
        hinhAnh: "https://salt.tikicdn.com/cache/280x280/ts/product/19/c4/cf/2d4d2c8db5e0a8d01c57f6cc7bcef5e3.jpg"
    },
    {
        tenSach: "Đời Ngắn Đừng Ngủ Dài",
        tacGia: "Robin Sharma",
        donGia: 89000,
        soQuyen: 11,
        namXuatBan: 2021,
        maNXB: 4,
        hinhAnh: "https://salt.tikicdn.com/cache/280x280/ts/product/51/0f/22/00c095d57e7c3d5d0fe144ae97aaa768.jpg"
    },
    {
        tenSach: "Trên Đường Băng",
        tacGia: "Tony Buổi Sáng",
        donGia: 99000,
        soQuyen: 13,
        namXuatBan: 2019,
        maNXB: 1,
        hinhAnh: "https://salt.tikicdn.com/cache/280x280/ts/product/04/47/4c/ce48f0ff12d75b0b8c2b1d22e7b81b72.jpg"
    },
    {
        tenSach: "Bạn Đắt Giá Bao Nhiêu",
        tacGia: "Vãn Tình",
        donGia: 75000,
        soQuyen: 17,
        namXuatBan: 2020,
        maNXB: 3,
        hinhAnh: "https://salt.tikicdn.com/cache/280x280/ts/product/92/28/84/a72c6de05dc1bd47b2b99b374e57d3f2.jpg"
    }
];

async function seedBooks() {
    try {
        await mongoose.connect(DB_URL);
        console.log('✓ Đã kết nối MongoDB');

        // Thêm/cập nhật các NXB
        console.log('\n--- Cập nhật Nhà Xuất Bản ---');
        for (const pub of publishersData) {
            const existingPub = await Publisher.findOne({ maNXB: pub.maNXB });
            if (!existingPub) {
                await Publisher.create(pub);
                console.log(`✓ Đã thêm NXB: ${pub.tenNXB} (Mã: ${pub.maNXB})`);
            } else {
                console.log(`⊘ NXB đã tồn tại: ${pub.tenNXB} (Mã: ${pub.maNXB})`);
            }
        }

        // Lấy maSach lớn nhất hiện có (đang có mã 1, bắt đầu từ 2)
        const lastBook = await Book.findOne().sort({ maSach: -1 });
        let currentMaSach = lastBook ? lastBook.maSach + 1 : 2;
        console.log(`\n--- Thêm Sách ---`);
        console.log(`✓ Bắt đầu từ mã sách: ${currentMaSach}`);

        // Thêm từng cuốn sách
        for (const bookData of booksData) {
            const existingBook = await Book.findOne({ tenSach: bookData.tenSach });

            if (!existingBook) {
                const newBook = await Book.create({
                    maSach: currentMaSach++,
                    ...bookData
                });
                const pub = publishersData.find(p => p.maNXB === newBook.maNXB);
                console.log(`✓ Đã thêm: ${newBook.tenSach} (Mã: ${newBook.maSach}) - NXB: ${pub.tenNXB}`);
            } else {
                console.log(`⊘ Đã tồn tại: ${bookData.tenSach}`);
            }
        }

        console.log('\n✓ Hoàn thành seed dữ liệu!');
        console.log(`Tổng số sách trong DB: ${await Book.countDocuments()}`);

    } catch (error) {
        console.error('✗ Lỗi:', error);
    } finally {
        await mongoose.connection.close();
        console.log('✓ Đã đóng kết nối');
    }
}

seedBooks();
