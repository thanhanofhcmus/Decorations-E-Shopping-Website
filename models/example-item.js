
const products = [
    {
        title: 'Lập Kế Hoạch Kinh Doanh Hiệu Quả',
        author: 'Brain Finch',
        link: '/products',
        imageLink: '/images/lap-ke-hoach-kinh-doanh-hieu-qua.jpg',
        price: '139.000',
        newPrice: '112.000',
        discount: 20,
        commentNum: 0
    },
    {
        title: 'Ma Bùn Lưu Manh Và Những Câu Chuyện Khác Của Nguyễn Trí',
        author: 'Nguyễn Trí',
        link: '#',
        imageLink: '/images/ma-bun-luu-manh.jpg',
        price: '139.000',
        newPrice: '112.000',
        discount: 20,
        commentNum: 0
    },
    {
        title: 'Bank 4.0 - Giao dịch mọi nơi, không chỉ là ngân hàng',
        author: 'Brett King',
        link: '#',
        imageLink: '/images/bank-4.0.jpg',
        price: '139.000',
        newPrice: '112.000',
        discount: 20,
        commentNum: 0
    },
    {
        title: 'Bộ Sách 500 Câu Chuyện Đạo Đức - Những Câu Chuyện Tình Thân (Bộ 8 Cuốn)',
        author: 'Nguyễn Hạnh - Trần Thị Thanh Nguyên',
        link: '#',
        imageLink: '/images/bo-sach-500-cau-chuyen-dao-duc.jpg',
        price: '139.000',
        newPrice: '112.000',
        discount: 20,
        commentNum: 0
    },
    {
        title: 'Lịch Sử Ung Thư - Hoàng Đế Của Bách Bệnh',
        author: 'Siddhartha Mukherjee',
        link: '#',
        imageLink: '/images/ung-thu-hoang-de-cua-bach-benh.jpg',
        price: '139.000',
        newPrice: '112.000',
        discount: 20,
        commentNum: 0
    },
    {
        title: 'Cuốn Sách Khám Phá: Trời Đêm Huyền Diệu',
        author: 'Disney Learning',
        link: '#',
        imageLink: '/images/troi-dem-huyen-dieu.jpg',
        price: '139.000',
        newPrice: '112.000',
        discount: 20,
        commentNum: 0
    },
    {
        title: 'Bộ Sách Những Câu Chuyện Cho Con Thành Người Tử Tế (Bộ 5 Cuốn)',
        author: 'Nhiều Tác Giả',
        link: '#',
        imageLink: '/images/bo-sach-nhung-cau-chuyen-cho-con-thanh-nguoi-tu-te.jpg',
        price: '139.000',
        newPrice: '112.000',
        discount: 20,
        commentNum: 0
    },
    {
        title: 'Lịch Sử Thế Giới',
        author: 'Nam Phong tùng thư - Phạm Quỳnh chủ nhiệm',
        link: '#',
        imageLink: '/images/lich-su-the-gioi.jpg',
        price: '139.000',
        newPrice: '112.000',
        discount: 20,
        commentNum: 0
    },
    {
        title: 'Chuyện Nghề Và Chuyện Đời - Bộ 4 Cuốn',
        author: 'Nguyễn Hữu Long',
        link: '#',
        imageLink: '/images/combo-chuyen-nghe-chuyen-doi.jpg',
        price: '139.000',
        newPrice: '112.000',
        discount: 20,
        commentNum: 0
    },
    {
        title: 'Combo Mẹ Con Sư Tử - Bồ Tát Ngàn Tay Ngàn Mắt',
        author: 'Thích Nhất Hạnh',
        link: '#',
        imageLink: '/images/combo-me-con-su-tu-bo-tat-ngan-tay-ngan-mat.jpg',
        price: '139.000',
        newPrice: '112.000',
        discount: 20,
        commentNum: 0
    },
    {
        title: 'Combo Osho: Hạnh Phúc Tại Tâm, Can Đảm Biến Thách Thức Thành Sức Mạnh & Sáng Tạo Bừng Cháy Sức Mạnh Bên Trong',
        author: 'Gosho Aoyama, Mutsuki Watanabe, Takahisa Taira',
        link: '#',
        imageLink: '/images/combo-hanh-phuc-sang-tao.jpg',
        price: '139.000',
        newPrice: '112.000',
        discount: 20,
        commentNum: 0
    },
    {
        title: 'Combo Giáo Dục Và Ý Nghĩa Cuộc Sống Và Bạn Đang Nghịch Gì Với Đời Mình?',
        author: 'J.Krishnamurti',
        link: '#',
        imageLink: '/images/combo-giao-duc-va-y-nghia-cuoc-song.jpg',
        price: '139.000',
        newPrice: '112.000',
        discount: 20,
        commentNum: 0
    },
    {
        title: 'Combo Dinh Dưỡng Xanh - Thần dược xanh',
        author: 'Ryu Seung-SunVictoria Boutenko',
        link: '#',
        imageLink: '/images/combo-dinh-duong-than-duoc-xanh.jpg',
        price: '139.000',
        newPrice: '112.000',
        discount: 20,
        commentNum: 0
    },
    {
        title: 'Combo Ăn Xanh Để Khỏe - Sống Lành Để Trẻ',
        author: 'Norman W. Walker',
        link: '#',
        imageLink: '/images/combo-an-xanh-song-lanh.jpg',
        price: '139.000',
        newPrice: '112.000',
        discount: 20,
        commentNum: 0
    },
    {
        title: 'Bộ Sách Phong Cách Sống (Bộ 5 Cuốn)',
        author: 'Marie Tourell Soderberg, Joanna Nylund, Yukari Mitsuhashi, Margareta Magnusson, Linnea Dunne',
        link: '#',
        imageLink: '/images/combo-phong-cach-song.jpg',
        price: '139.000',
        newPrice: '112.000',
        discount: 20,
        commentNum: 0
    },
    {
        title: 'Combo Lược Sử Loài Người - Lược Sử Tương Lai - 21 Bài Học Cho Thế Kỷ 21',
        author: 'Yuval Noah Harari',
        link: '#',
        imageLink: '/images/combo-luoc-su-loai-nguoi.jpg',
        price: '139.000',
        newPrice: '112.000',
        discount: 20,
        commentNum: 0
    }
];

module.exports = products;
