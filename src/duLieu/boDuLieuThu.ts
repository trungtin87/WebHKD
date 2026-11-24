import {
  DuLieuCuaHang,
  MaKhoiHienThi,
  MaNganh,
  PHIEN_BAN_DU_LIEU,
} from '../kieuDuLieu';
import { taoAnhMinhHoaDuLieuThu } from '../tienIch/xuLyAnh';
import { layGoiYTheoNganh } from './goiYTheoNganh';

export const CAC_KHOI_MAC_DINH: MaKhoiHienThi[] = [
  'dauTrang',
  'banner',
  'sanPham',
  'gioiThieu',
  'hoKinhDoanh',
  'diaChi',
  'lienHe',
  'cauCamOn',
];

// Tạo dữ liệu khởi tạo theo ngành nghề đã chọn ở Bước 1
export function taoDuLieuMacDinhTheoNganh(nganh: MaNganh): DuLieuCuaHang {
  const goiY = layGoiYTheoNganh(nganh);
  return {
    phienBan: PHIEN_BAN_DU_LIEU,
    nganh,
    tenCuaHang: '',
    khauHieu: goiY.khauHieuMau,
    logo: null,
    soZalo: '',
    soDienThoai: '',
    diaChi: '',
    linkBanDo: '',
    gioMoCua: goiY.gioMoCuaMau,
    mangXaHoi: { facebook: '', tiktok: '', instagram: '' },
    danhSachSanPham: goiY.sanPhamMau.map((sp, chiSo) => ({
      id: `sp_${chiSo + 1}`,
      ten: sp.ten,
      gia: sp.gia,
      donVi: sp.donVi,
      kieuGia: sp.gia !== null ? 'coGia' : 'lienHeDeBiet',
      moTa: sp.moTa,
      anh: null,
      noiBat: sp.noiBat,
    })),
    gioiThieu: {
      doanVan: goiY.doanGioiThieuMau,
      diemNoiBat: [...goiY.diemNoiBatMau],
    },
    hoKinhDoanh: {
      hienThongTinPhapLy: true,
      tenChuHo: '',
      maSoHoKinhDoanh: '',
      khuVucPhucVu: goiY.khuVucPhucVuMau,
      hinhThucBanHang:
        'Niêm yết giá tham khảo · Khách hàng liên hệ trực tiếp qua Zalo hoặc gọi điện để đặt hàng, không thanh toán trực tuyến.',
      chinhSachGiaoHang: '',
      thongTinMoRong: [],
    },
    cauCamOn: 'Cảm ơn quý khách hàng và bà con đã tin tưởng ủng hộ!',
    anhBanner: null,
    anhCuaHang: null,
    giaoDien: {
      maTheme: goiY.themeGoiY,
      mauChinh: null,
      cacKhoiHienThi: [...CAC_KHOI_MAC_DINH],
      hienMaQrZalo: true,
    },
  };
}

// Chuẩn hóa và bù trường thiếu khi mở lại file .json hoặc dữ liệu cũ
export function chuanHoaDuLieuNhap(duLieuTho: Partial<DuLieuCuaHang>): DuLieuCuaHang {
  const nganh: MaNganh = duLieuTho.nganh || 'amThuc';
  const macDinh = taoDuLieuMacDinhTheoNganh(nganh);

  const cacKhoiGoc = Array.isArray(duLieuTho.giaoDien?.cacKhoiHienThi)
    ? duLieuTho.giaoDien!.cacKhoiHienThi
    : [...CAC_KHOI_MAC_DINH];

  // Đảm bảo khối hoKinhDoanh tồn tại nếu mở file từ phiên bản cũ hơn
  const cacKhoiDayDu = cacKhoiGoc.includes('hoKinhDoanh')
    ? cacKhoiGoc
    : [...cacKhoiGoc.slice(0, 4), 'hoKinhDoanh' as MaKhoiHienThi, ...cacKhoiGoc.slice(4)];

  return {
    ...macDinh,
    ...duLieuTho,
    phienBan: PHIEN_BAN_DU_LIEU,
    mangXaHoi: {
      ...macDinh.mangXaHoi,
      ...(duLieuTho.mangXaHoi || {}),
    },
    danhSachSanPham:
      Array.isArray(duLieuTho.danhSachSanPham) && duLieuTho.danhSachSanPham.length > 0
        ? duLieuTho.danhSachSanPham.map((sp, idx) => ({
            id: sp.id || `sp_${idx + 1}`,
            ten: sp.ten || '',
            gia: typeof sp.gia === 'number' ? sp.gia : null,
            donVi: sp.donVi || '',
            kieuGia: sp.kieuGia || (typeof sp.gia === 'number' ? 'coGia' : 'lienHeDeBiet'),
            moTa: sp.moTa || '',
            anh: sp.anh || null,
            noiBat: Boolean(sp.noiBat),
          }))
        : macDinh.danhSachSanPham,
    gioiThieu: {
      doanVan: duLieuTho.gioiThieu?.doanVan ?? macDinh.gioiThieu.doanVan,
      diemNoiBat: Array.isArray(duLieuTho.gioiThieu?.diemNoiBat)
        ? duLieuTho.gioiThieu!.diemNoiBat
        : macDinh.gioiThieu.diemNoiBat,
    },
    hoKinhDoanh: {
      ...macDinh.hoKinhDoanh,
      ...(duLieuTho.hoKinhDoanh || {}),
      thongTinMoRong: Array.isArray(duLieuTho.hoKinhDoanh?.thongTinMoRong)
        ? duLieuTho.hoKinhDoanh!.thongTinMoRong
        : [],
    },
    giaoDien: {
      maTheme: duLieuTho.giaoDien?.maTheme || macDinh.giaoDien.maTheme,
      mauChinh: duLieuTho.giaoDien?.mauChinh ?? null,
      cacKhoiHienThi: cacKhoiDayDu,
      hienMaQrZalo: duLieuTho.giaoDien?.hienMaQrZalo ?? true,
    },
  };
}

export interface BoDuLieuThuItem {
  ma: string;
  ten: string;
  moTa: string;
  duLieu: DuLieuCuaHang;
}

// 5 bộ dữ liệu thử bắt buộc theo mục 12 của đặc tả để kiểm tra độ bền của mọi theme
export const BO_DU_LIEU_THU: BoDuLieuThuItem[] = [
  {
    ma: 'dayDu',
    ten: '1. Đầy đủ (6 món + ảnh + hộ kinh doanh)',
    moTa: 'Cửa hàng bún tươi & đặc sản Trảng Bàng có đầy đủ ảnh, 6 sản phẩm, thông tin chủ hộ và khu vực giao.',
    duLieu: {
      phienBan: 1,
      nganh: 'amThuc',
      tenCuaHang: 'Bún Tươi Trần Trọng (Tâm Bún)',
      khauHieu: 'Thơm ngon – Sạch sẽ – Làm mới mỗi sáng',
      logo: null,
      soZalo: '0909123456',
      soDienThoai: '0909123456',
      diaChi: 'Sạp 12, Chợ Trảng Bàng, TX. Trảng Bàng, Tây Ninh',
      linkBanDo: '',
      gioMoCua: '05:00 – 11:30 hằng ngày',
      mangXaHoi: {
        facebook: 'https://facebook.com/buntrantrong',
        tiktok: 'https://www.tiktok.com/@buntrantrong',
        instagram: '',
      },
      danhSachSanPham: [
        {
          id: 'sp1',
          ten: 'Bún Tươi Thủ Công',
          gia: 17000,
          donVi: 'kg',
          kieuGia: 'coGia',
          moTa: 'Bún gạo nguyên chất không hàn the, sợi dai mềm tự nhiên.',
          anh: taoAnhMinhHoaDuLieuThu('Bún Tươi', '17.000đ / kg', '#2E7D32', '#43A047', 640, 480),
          noiBat: true,
        },
        {
          id: 'sp2',
          ten: 'Chả Giò Thịt Giòn Rụm',
          gia: 70000,
          donVi: 'hộp 10 cuốn',
          kieuGia: 'coGia',
          moTa: 'Nhân thịt heo nóng, khoai môn, nấm mèo cuốn bánh tráng rế.',
          anh: taoAnhMinhHoaDuLieuThu('Chả Giò', '70.000đ / hộp', '#C62828', '#E53935', 640, 480),
          noiBat: true,
        },
        {
          id: 'sp3',
          ten: 'Bánh Phở Tươi Cắt Sẵn',
          gia: 22000,
          donVi: 'kg',
          kieuGia: 'coGia',
          moTa: 'Tráng từ gạo tẻ cũ, thích hợp nấu phở bò, phở gà tại nhà.',
          anh: taoAnhMinhHoaDuLieuThu('Bánh Phở', '22.000đ / kg', '#558B2F', '#7CB342', 640, 480),
          noiBat: false,
        },
        {
          id: 'sp4',
          ten: 'Chả Lụa Lá Chuối',
          gia: 160000,
          donVi: 'kg',
          kieuGia: 'coGia',
          moTa: 'Quết tay truyền thống, gói lá chuối thơm nức.',
          anh: taoAnhMinhHoaDuLieuThu('Chả Lụa', '160.000đ / kg', '#8D6E63', '#5D4037', 640, 480),
          noiBat: false,
        },
        {
          id: 'sp5',
          ten: 'Nước Dùng Nấu Sẵn (Đặt trước)',
          gia: 45000,
          donVi: 'lít',
          kieuGia: 'coGia',
          moTa: 'Hầm xương ống 6 tiếng, nêm nếm sẵn tiện lợi cho bữa sáng.',
          anh: taoAnhMinhHoaDuLieuThu('Nước Dùng', '45.000đ / lít', '#EF6C00', '#FB8C00', 640, 480),
          noiBat: false,
        },
        {
          id: 'sp6',
          ten: 'Mâm Bún Thịt Nướng Tiệc Gia Đình',
          gia: null,
          donVi: 'mâm',
          kieuGia: 'lienHeDeBiet',
          moTa: 'Nhận đặt theo số lượng người ăn, giao tận nhà.',
          anh: taoAnhMinhHoaDuLieuThu('Đặt Tiệc', 'Nhắn Zalo báo giá', '#00695C', '#26A69A', 640, 480),
          noiBat: false,
        },
      ],
      gioiThieu: {
        doanVan:
          'Lò bún gia đình Trần Trọng hơn 20 năm phục vụ bà con chợ Trảng Bàng. Gạo được ngâm ủ tự nhiên, xay bột và ép bún từ 3 giờ sáng để giữ trọn vị ngọt thanh của hạt gạo quê.',
        diemNoiBat: [
          'Không chất tẩy trắng',
          'Ép mới mỗi sáng',
          'Giá sỉ cho quán ăn',
          'Giao tận nơi Trảng Bàng',
        ],
      },
      hoKinhDoanh: {
        hienThongTinPhapLy: true,
        tenChuHo: 'Ông Trần Văn Trọng',
        maSoHoKinhDoanh: 'HKD-45A8012345',
        khuVucPhucVu: 'Nội thị Trảng Bàng, An Tịnh, Gia Lộc (bán kính 8km)',
        hinhThucBanHang:
          'Bảng niêm yết giá bán lẻ tại lò. Quý khách vui lòng nhắn Zalo hoặc gọi trực tiếp để giữ hàng buổi sáng, thanh toán khi nhận hàng.',
        chinhSachGiaoHang: 'Giao miễn phí từ 3kg trong khu vực chợ Trảng Bàng.',
        thongTinMoRong: [
          { id: 'mr1', nhan: 'Vệ sinh ATTP', giaTri: 'Cam kết nguyên liệu sạch hằng ngày' },
          { id: 'mr2', nhan: 'Đặt số lượng lớn', giaTri: 'Báo trước 1 ngày qua Zalo' },
        ],
      },
      cauCamOn: 'Cảm ơn bà con Trảng Bàng đã luôn tin tưởng và ủng hộ!',
      anhBanner: taoAnhMinhHoaDuLieuThu(
        'Bún Tươi Trần Trọng',
        'Đặc sản truyền thống Chợ Trảng Bàng',
        '#1B5E20',
        '#388E3C',
        1200,
        675
      ),
      anhCuaHang: taoAnhMinhHoaDuLieuThu(
        'Sạp 12 - Chợ Trảng Bàng',
        'Mở cửa 05:00 – 11:30 hằng ngày',
        '#33691E',
        '#689F38',
        900,
        600
      ),
      giaoDien: {
        maTheme: 'nongSanXanhLa',
        mauChinh: null,
        cacKhoiHienThi: [...CAC_KHOI_MAC_DINH],
        hienMaQrZalo: true,
      },
    },
  },
  {
    ma: 'toiThieu',
    ten: '2. Tối thiểu (Không ảnh, không giá)',
    moTa: 'Chỉ có tên cửa hàng, số Zalo, địa chỉ và 1 sản phẩm không ảnh, không giá.',
    duLieu: {
      phienBan: 1,
      nganh: 'khac',
      tenCuaHang: 'Tiệm Sửa Khóa Chú Bảy',
      khauHieu: '',
      logo: null,
      soZalo: '0912345678',
      soDienThoai: '0912345678',
      diaChi: 'Ngã tư Phú Nhuận, TP. Hồ Chí Minh',
      linkBanDo: '',
      gioMoCua: '',
      mangXaHoi: { facebook: '', tiktok: '', instagram: '' },
      danhSachSanPham: [
        {
          id: 'sp1',
          ten: 'Mở khóa cửa, làm chìa tận nơi',
          gia: null,
          donVi: '',
          kieuGia: 'lienHeDeBiet',
          moTa: '',
          anh: null,
          noiBat: false,
        },
      ],
      gioiThieu: { doanVan: '', diemNoiBat: [] },
      hoKinhDoanh: {
        hienThongTinPhapLy: true,
        tenChuHo: '',
        maSoHoKinhDoanh: '',
        khuVucPhucVu: '',
        hinhThucBanHang: 'Liên hệ trực tiếp qua Zalo hoặc gọi điện để báo giá trước khi làm.',
        chinhSachGiaoHang: '',
        thongTinMoRong: [],
      },
      cauCamOn: 'Cảm ơn bạn đã ủng hộ!',
      anhBanner: null,
      anhCuaHang: null,
      giaoDien: {
        maTheme: 'dichVuXanhDuong',
        mauChinh: null,
        cacKhoiHienThi: [...CAC_KHOI_MAC_DINH],
        hienMaQrZalo: true,
      },
    },
  },
  {
    ma: 'chuDai',
    ten: '3. Chữ dài (Kiểm tra tràn khung)',
    moTa: 'Tên cửa hàng 60 ký tự, tên sản phẩm 50 ký tự, đoạn giới thiệu 400 ký tự.',
    duLieu: {
      phienBan: 1,
      nganh: 'thuCong',
      tenCuaHang: 'Cửa Hàng Đặc Sản Thủ Công Truyền Thống Gia Truyền Hương Quê',
      khauHieu:
        'Giữ gìn tinh hoa nghề thủ công mây tre đan và đặc sản bánh mứt cổ truyền phục vụ bà con bốn mùa',
      logo: null,
      soZalo: '0987654321',
      soDienThoai: '0987654321',
      diaChi: 'Số 128B Đường Nguyễn Đình Chiểu, Phường Phú Cường, TP. Thủ Dầu Một, Tỉnh Bình Dương',
      linkBanDo: '',
      gioMoCua: '07:30 – 21:00 tất cả các ngày trong tuần kể cả lễ Tết',
      mangXaHoi: { facebook: 'https://facebook.com/huongquethucong', tiktok: '', instagram: '' },
      danhSachSanPham: [
        {
          id: 'sp1',
          ten: 'Bộ Khay Trà Gỗ Hương Khảm Trai Thủ Công Mỹ Nghệ',
          gia: 1250000,
          donVi: 'bộ nguyên hộp',
          kieuGia: 'coGia',
          moTa: 'Chế tác thủ công từ gỗ tự nhiên đã qua xử lý chống mối mọt và cong vênh.',
          anh: null,
          noiBat: true,
        },
        {
          id: 'sp2',
          ten: 'Giỏ Quà Biếu Đặc Sản Bánh Mứt Cổ Truyền Ba Miền',
          gia: 495000,
          donVi: 'giỏ lớn',
          kieuGia: 'coGia',
          moTa: 'Gồm trà sen, mứt gừng, bánh pía và hạt điều rang củi đóng gói trang trọng.',
          anh: null,
          noiBat: false,
        },
      ],
      gioiThieu: {
        doanVan:
          'Cơ sở gia truyền hơn ba thế hệ gắn bó với nghề làm đồ thủ công mỹ nghệ và bánh mứt cổ truyền tại đất Thủ. Từng món hàng đều được tuyển chọn nguyên liệu mộc tự nhiên từ làng nghề, không sử dụng chất bảo quản công nghiệp. Chúng tôi chỉ niêm yết giá minh bạch trên trang giới thiệu để quý khách dễ tham khảo, sau đó trao đổi trực tiếp qua Zalo để lựa chọn mẫu mã ưng ý và giao hàng tận nơi quanh khu vực.',
        diemNoiBat: [
          'Nguyên liệu tự nhiên chọn lọc từ làng nghề',
          'Đóng gói hộp quà sang trọng theo yêu cầu',
          'Kiểm tra hàng kỹ trước khi thanh toán',
          'Tư vấn tận tình qua Zalo 7 ngày/tuần',
        ],
      },
      hoKinhDoanh: {
        hienThongTinPhapLy: true,
        tenChuHo: 'Bà Nguyễn Thị Thanh Hương',
        maSoHoKinhDoanh: 'HKD-37B9098877',
        khuVucPhucVu: 'TP. Thủ Dầu Một, Thuận An, Dĩ An và các khu vực lân cận trong tỉnh Bình Dương',
        hinhThucBanHang:
          'Trang niêm yết giá tham khảo của hộ kinh doanh. Không bán hàng qua giỏ hàng tự động, quý khách vui lòng nhắn Zalo hoặc gọi điện xác nhận mẫu.',
        chinhSachGiaoHang: 'Giao tận tay trong ngày tại khu vực Thủ Dầu Một.',
        thongTinMoRong: [
          { id: 'mr1', nhan: 'Xuất xứ', giaTri: 'Sản xuất trực tiếp tại xưởng gia đình' },
        ],
      },
      cauCamOn: 'Kính chúc quý khách và gia đình thật nhiều sức khỏe, an khang!',
      anhBanner: null,
      anhCuaHang: null,
      giaoDien: {
        maTheme: 'thuCongMauDat',
        mauChinh: null,
        cacKhoiHienThi: [...CAC_KHOI_MAC_DINH],
        hienMaQrZalo: true,
      },
    },
  },
  {
    ma: 'nhieuSanPham',
    ten: '4. Nhiều sản phẩm (12 món)',
    moTa: '12 sản phẩm xen kẽ có ảnh và không ảnh, kiểm tra bố cục lưới và danh sách dài.',
    duLieu: {
      phienBan: 1,
      nganh: 'nongSan',
      tenCuaHang: 'Nông Sản Sạch Vườn Nhà',
      khauHieu: 'Tươi ngon từ vườn nhà – Giao trong ngày',
      logo: null,
      soZalo: '0933445566',
      soDienThoai: '0933445566',
      diaChi: 'Ấp Tân Lập, Xã Tân Phú, H. Châu Thành, Bến Tre',
      linkBanDo: '',
      gioMoCua: '06:00 – 18:30 hằng ngày',
      mangXaHoi: { facebook: '', tiktok: '', instagram: '' },
      danhSachSanPham: Array.from({ length: 12 }).map((_, idx) => {
        const danhSachTen = [
          'Bưởi Da Xanh Ruột Hồng',
          'Dừa Xiêm Xanh Ngọt Nước',
          'Sầu Riêng Ri6 Cơm Vàng',
          'Măng Cụt Lái Thiêu',
          'Chôm Chôm Nhãn Chín Cây',
          'Mít Thái Siêu Sớm Tách Múi',
          'Chuối Sứ Chín Tự Nhiên',
          'Cam Sành Vĩnh Long',
          'Mật Ong Hoa Nhãn',
          'Kẹo Dừa Lá Dứa Thủ Công',
          'Bánh Tráng Sữa Nước Cốt Dừa',
          'Combo Trái Cây Cúng Rằm',
        ];
        const danhSachGia = [
          55000, 15000, 115000, 85000, 42000, 45000, 22000, 28000, 175000, 35000, 30000, null,
        ];
        const coAnh = idx % 2 === 0;
        return {
          id: `sp_${idx + 1}`,
          ten: danhSachTen[idx],
          gia: danhSachGia[idx],
          donVi: idx === 1 ? 'trái' : idx === 11 ? 'mâm' : 'kg',
          kieuGia: danhSachGia[idx] !== null ? 'coGia' : 'lienHeDeBiet',
          moTa: 'Thu hoạch sáng sớm tại vườn, bao ăn tươi ngon.',
          anh: coAnh
            ? taoAnhMinhHoaDuLieuThu(
                `Món ${idx + 1}`,
                danhSachTen[idx].slice(0, 18),
                '#2E7D32',
                '#558B2F',
                600,
                450
              )
            : null,
          noiBat: idx < 2,
        };
      }),
      gioiThieu: {
        doanVan:
          'Vườn trái cây nhà trồng theo hướng hữu cơ, hái mới mỗi sáng theo đơn bà con nhắn qua Zalo.',
        diemNoiBat: ['Hái mới mỗi sáng', 'Không thuốc bảo quản', 'Cân đúng ký'],
      },
      hoKinhDoanh: {
        hienThongTinPhapLy: true,
        tenChuHo: 'Anh Lê Minh Tuấn',
        maSoHoKinhDoanh: '',
        khuVucPhucVu: 'TP. Bến Tre, Châu Thành và gửi xe về TP.HCM trong ngày',
        hinhThucBanHang: 'Niêm yết giá theo ngày tại vườn. Vui lòng nhắn Zalo kiểm tra độ chín.',
        chinhSachGiaoHang: 'Giao tận nhà khu vực Châu Thành.',
        thongTinMoRong: [],
      },
      cauCamOn: 'Cảm ơn quý khách đã ủng hộ nông sản vườn nhà!',
      anhBanner: null,
      anhCuaHang: null,
      giaoDien: {
        maTheme: 'nongSanXanhLa',
        mauChinh: null,
        cacKhoiHienThi: [...CAC_KHOI_MAC_DINH],
        hienMaQrZalo: true,
      },
    },
  },
  {
    ma: 'thieuAnh',
    ten: '5. Thiếu ảnh hoàn toàn (Chỉ chữ & giá)',
    moTa: 'Có đầy đủ sản phẩm, giá bán, thông tin hộ kinh doanh nhưng không tải lên bất kỳ ảnh nào.',
    duLieu: {
      phienBan: 1,
      nganh: 'myPham',
      tenCuaHang: 'Tiệm Dưỡng Da Thảo Mộc An Nhiên',
      khauHieu: 'Lành tính từ thiên nhiên – Tư vấn tận tâm',
      logo: null,
      soZalo: '0977889900',
      soDienThoai: '0977889900',
      diaChi: '45 Lê Lợi, Phường 4, TP. Tuy Hòa, Phú Yên',
      linkBanDo: '',
      gioMoCua: '08:30 – 20:30 hằng ngày',
      mangXaHoi: { facebook: '', tiktok: '', instagram: 'annhien.thaomoc' },
      danhSachSanPham: [
        {
          id: 'sp1',
          ten: 'Nước Tẩy Trang Hoa Cúc Dịu Nhẹ',
          gia: 195000,
          donVi: 'chai 200ml',
          kieuGia: 'coGia',
          moTa: 'Không cồn, không hương liệu, phù hợp da nhạy cảm.',
          anh: null,
          noiBat: true,
        },
        {
          id: 'sp2',
          ten: 'Sữa Rửa Mặt Trà Xanh',
          gia: 160000,
          donVi: 'tuýp 120ml',
          kieuGia: 'coGia',
          moTa: 'Làm sạch dịu nhẹ, giữ ẩm tự nhiên cho da dầu mụn.',
          anh: null,
          noiBat: false,
        },
        {
          id: 'sp3',
          ten: 'Combo Chăm Sóc Da Cơ Bản',
          gia: null,
          donVi: 'bộ',
          kieuGia: 'anGia',
          moTa: 'Nhắn Zalo để được soi da và chọn bộ sản phẩm phù hợp.',
          anh: null,
          noiBat: false,
        },
      ],
      gioiThieu: {
        doanVan:
          'Cửa hàng nhỏ chuyên các dòng sản phẩm chăm sóc da lành tính, rõ nguồn gốc. Khách hàng tại Tuy Hòa có thể ghé thử trực tiếp hoặc nhắn Zalo để được tư vấn kỹ trước khi mua.',
        diemNoiBat: ['Rõ nguồn gốc', 'Tư vấn 1-1 qua Zalo', 'Không ép mua'],
      },
      hoKinhDoanh: {
        hienThongTinPhapLy: true,
        tenChuHo: 'Chị Phạm Ngọc Lan',
        maSoHoKinhDoanh: '',
        khuVucPhucVu: 'Nội thành TP. Tuy Hòa và các huyện lân cận',
        hinhThucBanHang: 'Niêm yết giá bán lẻ tại tiệm, tư vấn trực tiếp qua Zalo.',
        chinhSachGiaoHang: 'Ship đồng giá 15.000đ nội thành Tuy Hòa.',
        thongTinMoRong: [],
      },
      cauCamOn: 'Cảm ơn bạn đã ghé thăm Tiệm Thảo Mộc An Nhiên!',
      anhBanner: null,
      anhCuaHang: null,
      giaoDien: {
        maTheme: 'toiGianSang',
        mauChinh: null,
        cacKhoiHienThi: [...CAC_KHOI_MAC_DINH],
        hienMaQrZalo: true,
      },
    },
  },
];
