import { MaNganh } from '../kieuDuLieu';

export interface GoiYNganh {
  ma: MaNganh;
  ten: string;
  moTaNgan: string;
  viDuCuaHang: string;
  khauHieuMau: string;
  doanGioiThieuMau: string;
  diemNoiBatMau: string[];
  khuVucPhucVuMau: string;
  gioMoCuaMau: string;
  sanPhamMau: Array<{
    ten: string;
    gia: number | null;
    donVi: string;
    moTa: string;
    noiBat: boolean;
  }>;
  themeGoiY: string;
}

// Danh sách ngành nghề phổ biến của hộ kinh doanh Việt Nam kèm nội dung gợi ý sẵn
export const GOI_Y_THEO_NGANH: GoiYNganh[] = [
  {
    ma: 'amThuc',
    ten: 'Ẩm thực & Quán ăn',
    moTaNgan: 'Bún, phở, cơm phần, trà sữa, bánh quê, đồ ăn vặt gia đình',
    viDuCuaHang: 'Quán Bún Tâm, Bún Tươi Trần Trọng, Bánh Xèo Cô Ba',
    khauHieuMau: 'Thơm ngon – Sạch sẽ – An toàn',
    doanGioiThieuMau:
      'Quán gia đình tự tay chuẩn bị nguyên liệu mới mỗi sáng, giữ trọn hương vị truyền thống quê nhà. Nhận đặt phần ăn, giao nóng trong khu vực và phục vụ tận tâm từng bữa ăn ngon.',
    diemNoiBatMau: ['Nguyên liệu tươi mỗi ngày', 'Chế biến thủ công', 'Giá hợp lý'],
    khuVucPhucVuMau: 'Giao nhanh bán kính 5km quanh cửa hàng',
    gioMoCuaMau: '05:30 – 20:00 hằng ngày',
    sanPhamMau: [
      {
        ten: 'Bún Tươi Thủ Công',
        gia: 17000,
        donVi: 'kg',
        moTa: 'Sợi bún trắng trong, dai mềm tự nhiên, làm mới mỗi sáng sớm.',
        noiBat: true,
      },
      {
        ten: 'Chả Giò Thịt Giòn Rụm',
        gia: 65000,
        donVi: 'hộp 10 cuốn',
        moTa: 'Nhân thịt heo, mộc nhĩ, khoai môn cuốn tay vừa ăn.',
        noiBat: false,
      },
    ],
    themeGoiY: 'nongSanXanhLa',
  },
  {
    ma: 'nongSan',
    ten: 'Nông sản & Đặc sản quê',
    moTaNgan: 'Trái cây vườn, rau sạch, gạo quê, mật ong, đặc sản vùng miền',
    viDuCuaHang: 'Vườn Xoài Chú Tư, Nông Sản Sạch Tây Ninh',
    khauHieuMau: 'Tươi ngon từ vườn nhà',
    doanGioiThieuMau:
      'Nông sản thu hái trực tiếp tại vườn, chọn lọc kỹ lưỡng trước khi gửi đến tay bà con. Cam kết minh bạch nguồn gốc, giá niêm yết rõ ràng và hỗ trợ giao tận nơi trong ngày.',
    diemNoiBatMau: ['Không hóa chất độc hại', 'Hái mới mỗi ngày', 'Giao tận nơi'],
    khuVucPhucVuMau: 'Nội thành và các xã, phường lân cận trong ngày',
    gioMoCuaMau: '06:00 – 19:00 hằng ngày',
    sanPhamMau: [
      {
        ten: 'Xoài Cát Hòa Lộc Loại 1',
        gia: 55000,
        donVi: 'kg',
        moTa: 'Chín cây tự nhiên, vị ngọt thanh, thịt dày ít xơ.',
        noiBat: true,
      },
      {
        ten: 'Mật Ong Hoa Rừng Nguyên Chất',
        gia: 180000,
        donVi: 'chai 500ml',
        moTa: 'Khai thác tại vườn, đóng chai thủy tinh sạch sẽ.',
        noiBat: false,
      },
    ],
    themeGoiY: 'nongSanXanhLa',
  },
  {
    ma: 'thoiTrang',
    ten: 'Thời trang & May mặc',
    moTaNgan: 'Shop quần áo, áo dài, đồ bộ mặc nhà, tiệm may đo gia đình',
    viDuCuaHang: 'Tiệm Vải & Áo Dài Minh Thư',
    khauHieuMau: 'Phong cách của riêng bạn',
    doanGioiThieuMau:
      'Cửa hàng chuyên các mẫu trang phục mặc hằng ngày và đi tiệc với chất liệu thoáng mát, đường may kỹ lưỡng. Khách xem mẫu và nhắn Zalo để được tư vấn chọn size chuẩn nhất.',
    diemNoiBatMau: ['Chất liệu thoải mái', 'Mẫu mới mỗi tuần', 'Đổi size dễ dàng'],
    khuVucPhucVuMau: 'Thử đồ trực tiếp tại tiệm hoặc ship nội tỉnh',
    gioMoCuaMau: '08:30 – 21:00 hằng ngày',
    sanPhamMau: [
      {
        ten: 'Áo Sơ Mi Linen Thoáng Mát',
        gia: 245000,
        donVi: 'chiếc',
        moTa: 'Vải đũi tự nhiên thấm hút tốt, đủ size S đến XL.',
        noiBat: true,
      },
      {
        ten: 'Quần Tây Ống Đứng Công Sở',
        gia: 290000,
        donVi: 'chiếc',
        moTa: 'Form đứng dáng, không nhăn, hỗ trợ lên gấu miễn phí.',
        noiBat: false,
      },
    ],
    themeGoiY: 'toiGianSang',
  },
  {
    ma: 'myPham',
    ten: 'Mỹ phẩm & Chăm sóc da',
    moTaNgan: 'Dưỡng da thiên nhiên, dầu gội thảo mộc, tiệm spa nhỏ',
    viDuCuaHang: 'Thảo Mộc An Nhiên, Tiệm Dưỡng Da Hoa Cúc',
    khauHieuMau: 'Chăm sóc làn da mỗi ngày',
    doanGioiThieuMau:
      'Chuyên các sản phẩm chăm sóc da và tóc lành tính, nguồn gốc rõ ràng. Tư vấn trực tiếp 1-1 qua Zalo theo tình trạng da để bạn chọn đúng sản phẩm phù hợp và tiết kiệm.',
    diemNoiBatMau: ['Thành phần rõ ràng', 'Chính hãng', 'Tư vấn tận tâm'],
    khuVucPhucVuMau: 'Nhận tư vấn toàn khu vực, giao nhanh trong ngày',
    gioMoCuaMau: '09:00 – 20:30 hằng ngày',
    sanPhamMau: [
      {
        ten: 'Dầu Gội Bồ Kết Thảo Dược',
        gia: 165000,
        donVi: 'chai 300ml',
        moTa: 'Nấu cô đặc từ bồ kết, vỏ bưởi, hương nhu giúp giảm gãy rụng.',
        noiBat: true,
      },
      {
        ten: 'Kem Chống Nắng Dịu Nhẹ',
        gia: 280000,
        donVi: 'tuýp 50ml',
        moTa: 'Thấm nhanh không nhờn rít, phù hợp da nhạy cảm.',
        noiBat: false,
      },
    ],
    themeGoiY: 'toiGianSang',
  },
  {
    ma: 'dichVu',
    ten: 'Dịch vụ & Sửa chữa tại nhà',
    moTaNgan: 'Điện lạnh, sửa ống nước, thay gas, cắt tóc, giặt ủi, sửa xe',
    viDuCuaHang: 'Điện Lạnh Thành Công, Giặt Ủi Sạch Sẽ 24h',
    khauHieuMau: 'Uy tín – Nhanh chóng – Tận tâm',
    doanGioiThieuMau:
      'Đội ngũ thợ lành nghề phục vụ tận nơi quanh khu vực. Luôn kiểm tra kỹ và báo giá công khai trước khi làm, có phiếu bảo hành rõ ràng để khách hàng yên tâm tuyệt đối.',
    diemNoiBatMau: ['Có mặt đúng giờ', 'Báo giá rõ ràng', 'Bảo hành sau dịch vụ'],
    khuVucPhucVuMau: 'Có mặt sau 20–30 phút tại các phường/xã lân cận',
    gioMoCuaMau: '07:00 – 21:00 (Cả Thứ 7 & Chủ Nhật)',
    sanPhamMau: [
      {
        ten: 'Vệ Sinh Máy Lạnh Treo Tường',
        gia: 150000,
        donVi: 'máy',
        moTa: 'Xịt rửa dàn lạnh, dàn nóng, kiểm tra áp suất gas miễn phí.',
        noiBat: true,
      },
      {
        ten: 'Kiểm Tra & Sửa Chữa Điện Nước',
        gia: null,
        donVi: 'lần',
        moTa: 'Khảo sát tận nơi, báo giá trước khi thi công.',
        noiBat: false,
      },
    ],
    themeGoiY: 'dichVuXanhDuong',
  },
  {
    ma: 'thuCong',
    ten: 'Thủ công mỹ nghệ & Quà tặng',
    moTaNgan: 'Gốm sứ, mây tre đan, nến thơm, bánh mứt truyền thống, quà Tết',
    viDuCuaHang: 'Gốm Mộc Làng Nghề, Trà Sen Cổ Truyền',
    khauHieuMau: 'Làm bằng tay, gửi bằng tâm',
    doanGioiThieuMau:
      'Mỗi sản phẩm được chế tác tỉ mỉ bởi bàn tay người thợ Việt, giữ nét mộc mạc và tinh tế. Nhận gói quà biếu tặng theo yêu cầu cho gia đình và doanh nghiệp địa phương.',
    diemNoiBatMau: ['Từng sản phẩm độc bản', 'Chất liệu tự nhiên', 'Nhận làm theo yêu cầu'],
    khuVucPhucVuMau: 'Đóng gói chống sốc kỹ, giao hàng khu vực và gửi chành xe',
    gioMoCuaMau: '08:00 – 19:30 hằng ngày',
    sanPhamMau: [
      {
        ten: 'Bộ Ấm Chén Gốm Men Tro Mộc',
        gia: 420000,
        donVi: 'bộ 7 món',
        moTa: 'Nung củi truyền thống, giữ nhiệt lâu, phù hợp tiếp khách.',
        noiBat: true,
      },
      {
        ten: 'Giỏ Quà Tre Đan Thủ Công',
        gia: 250000,
        donVi: 'giỏ',
        moTa: 'Đan tay chắc chắn từ tre già xử lý tự nhiên.',
        noiBat: false,
      },
    ],
    themeGoiY: 'thuCongMauDat',
  },
  {
    ma: 'khac',
    ten: 'Ngành nghề khác',
    moTaNgan: 'Tạp hóa, nhà thuốc, hoa tươi, văn phòng phẩm, cửa hàng tổng hợp',
    viDuCuaHang: 'Tạp Hóa Cô Lan, Tiệm Hoa Tươi Tháng Năm',
    khauHieuMau: '',
    doanGioiThieuMau: '',
    diemNoiBatMau: [],
    khuVucPhucVuMau: 'Phục vụ khách hàng tại cửa hàng và khu vực lân cận',
    gioMoCuaMau: '07:00 – 21:00 hằng ngày',
    sanPhamMau: [
      {
        ten: 'Sản phẩm chủ lực của cửa hàng',
        gia: null,
        donVi: 'cái',
        moTa: 'Mô tả ngắn gọn về chất lượng và quy cách sản phẩm.',
        noiBat: true,
      },
    ],
    themeGoiY: 'phoCoVangAm',
  },
];

export function layGoiYTheoNganh(maNganh: MaNganh): GoiYNganh {
  return GOI_Y_THEO_NGANH.find((item) => item.ma === maNganh) || GOI_Y_THEO_NGANH[0];
}
