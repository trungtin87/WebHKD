import React, { useState } from 'react';
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ChevronDown,
  ChevronUp,
  ImagePlus,
  Plus,
  Sparkles,
  Trash2,
} from 'lucide-react';
import { GOI_Y_THEO_NGANH, layGoiYTheoNganh } from '../duLieu/goiYTheoNganh';
import {
  DuLieuCuaHang,
  KieuGiaSanPham,
  LoiKiemTraForm,
  MaNganh,
  SO_DIEM_NOI_BAT_TOI_DA,
  SO_SAN_PHAM_TOI_DA,
  SO_THONG_TIN_MO_RONG_TOI_DA,
  SanPham,
} from '../kieuDuLieu';
import { nenVaThuNhoAnh } from '../tienIch/xuLyAnh';
import {
  chuanHoaLinkMangXaHoi,
  chuanHoaSoDienThoai,
  dinhDangGiaTien,
  kiemTraFormBuoc2,
  kiemTraSoDienThoaiVN,
  taoLinkBanDo,
} from '../tienIch/xuLyDuLieu';

interface Buoc2NhapThongTinProps {
  duLieu: DuLieuCuaHang;
  onCapNhat: (capNhat: (cu: DuLieuCuaHang) => DuLieuCuaHang) => void;
  onQuayLaiBuoc1: () => void;
  onSangBuoc3: () => void;
}

const GOI_Y_KHU_VUC_NHANH = [
  'Bán kính 5km quanh cửa hàng',
  'Nội thành & các phường/xã lân cận',
  'Giao trong ngày tại quận/huyện địa phương',
  'Nhận tại tiệm hoặc gửi xe liên tỉnh',
];

export const Buoc2NhapThongTin: React.FC<Buoc2NhapThongTinProps> = ({
  duLieu,
  onCapNhat,
  onQuayLaiBuoc1,
  onSangBuoc3,
}) => {
  const [daChamTruong, setDaChamTruong] = useState<Record<string, boolean>>({});
  const [daNhanTiepTuc, setDaNhanTiepTuc] = useState(false);
  const [dangNenAnh, setDangNenAnh] = useState<string | null>(null);
  const [loiAnh, setLoiAnh] = useState<string | null>(null);
  const [moMoRongHkd, setMoMoRongHkd] = useState(true);
  const [moMangXaHoi, setMoMangXaHoi] = useState(
    Boolean(
      duLieu.mangXaHoi.facebook || duLieu.mangXaHoi.tiktok || duLieu.mangXaHoi.instagram
    )
  );

  const { hopLe, cacLoi, phanTramHoanThien } = kiemTraFormBuoc2(duLieu);
  const goiYNganh = layGoiYTheoNganh(duLieu.nganh);

  const hienLoi = (tenTruong: keyof LoiKiemTraForm): string | undefined => {
    if (!daChamTruong[tenTruong] && !daNhanTiepTuc) return undefined;
    const giaTri = cacLoi[tenTruong];
    return typeof giaTri === 'string' ? giaTri : undefined;
  };

  const xuLyTaiAnh = async (
    file: File | undefined,
    khoa: string,
    ganKetQua: (dataUrl: string) => void
  ) => {
    if (!file) return;
    setLoiAnh(null);
    setDangNenAnh(khoa);
    try {
      const chuoiNen = await nenVaThuNhoAnh(file);
      ganKetQua(chuoiNen);
    } catch (err) {
      setLoiAnh(err instanceof Error ? err.message : 'Không xử lý được ảnh.');
    } finally {
      setDangNenAnh(null);
    }
  };

  const capNhatSanPham = (id: string, thayDoi: Partial<SanPham>) => {
    onCapNhat((cu) => ({
      ...cu,
      danhSachSanPham: cu.danhSachSanPham.map((sp) =>
        sp.id === id ? { ...sp, ...thayDoi } : sp
      ),
    }));
  };

  const themSanPham = () => {
    if (duLieu.danhSachSanPham.length >= SO_SAN_PHAM_TOI_DA) return;
    const idMoi = `sp_${Date.now()}`;
    onCapNhat((cu) => ({
      ...cu,
      danhSachSanPham: [
        ...cu.danhSachSanPham,
        {
          id: idMoi,
          ten: '',
          gia: null,
          donVi: '',
          kieuGia: 'coGia',
          moTa: '',
          anh: null,
          noiBat: false,
        },
      ],
    }));
  };

  const xoaSanPham = (id: string) => {
    if (duLieu.danhSachSanPham.length <= 1) return;
    onCapNhat((cu) => ({
      ...cu,
      danhSachSanPham: cu.danhSachSanPham.filter((sp) => sp.id !== id),
    }));
  };

  const doiViTriSanPham = (chiSo: number, huong: -1 | 1) => {
    const dich = chiSo + huong;
    if (dich < 0 || dich >= duLieu.danhSachSanPham.length) return;
    onCapNhat((cu) => {
      const banSao = [...cu.danhSachSanPham];
      const tam = banSao[chiSo];
      banSao[chiSo] = banSao[dich];
      banSao[dich] = tam;
      return { ...cu, danhSachSanPham: banSao };
    });
  };

  const themDiemNoiBat = () => {
    if (duLieu.gioiThieu.diemNoiBat.length >= SO_DIEM_NOI_BAT_TOI_DA) return;
    onCapNhat((cu) => ({
      ...cu,
      gioiThieu: {
        ...cu.gioiThieu,
        diemNoiBat: [...cu.gioiThieu.diemNoiBat, ''],
      },
    }));
  };

  const themThongTinMoRongHkd = () => {
    if (duLieu.hoKinhDoanh.thongTinMoRong.length >= SO_THONG_TIN_MO_RONG_TOI_DA) return;
    onCapNhat((cu) => ({
      ...cu,
      hoKinhDoanh: {
        ...cu.hoKinhDoanh,
        thongTinMoRong: [
          ...cu.hoKinhDoanh.thongTinMoRong,
          { id: `mr_${Date.now()}`, nhan: '', giaTri: '' },
        ],
      },
    }));
  };

  const xuLyTiepTuc = () => {
    setDaNhanTiepTuc(true);
    if (hopLe) {
      onSangBuoc3();
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const dungChungSoZalo =
    !duLieu.soDienThoai.trim() ||
    chuanHoaSoDienThoai(duLieu.soDienThoai) === chuanHoaSoDienThoai(duLieu.soZalo);

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 pb-28 sm:px-6 sm:py-8 lg:pb-12">
      {/* Tiêu đề & Thanh tiến độ */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-neutral-200 pb-5">
        <div>
          <button
            type="button"
            onClick={onQuayLaiBuoc1}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-neutral-600 hover:text-neutral-900 mb-2 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Đổi ngành nghề</span>
          </button>
          <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900">
            Nhập thông tin cửa hàng
          </h1>
          <p className="mt-1 text-sm text-neutral-600">
            Chỉ cần điền các mục có dấu <span className="text-red-600 font-semibold">*</span> để
            xem trước giao diện. Mục để trống sẽ tự ẩn gọn gàng.
          </p>
        </div>

        <div className="w-full sm:w-64 shrink-0">
          <div className="flex items-center justify-between text-xs font-medium text-neutral-600 mb-1.5">
            <span>Mức độ đầy đủ nội dung</span>
            <span className="tabular-nums font-bold text-emerald-800">{phanTramHoanThien}%</span>
          </div>
          <div className="h-2 w-full rounded-full bg-neutral-200 overflow-hidden">
            <div
              className="h-full bg-emerald-700 transition-all duration-300"
              style={{ width: `${phanTramHoanThien}%` }}
            />
          </div>
        </div>
      </div>

      {/* Thông báo lỗi tổng hợp nếu bấm tiếp tục khi thiếu trường bắt buộc */}
      {daNhanTiepTuc && !hopLe && (
        <div
          role="alert"
          className="mt-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-900"
        >
          <p className="font-semibold">
            Cần bổ sung vài thông tin bắt buộc trước khi xem trước giao diện:
          </p>
          <ul className="mt-1.5 list-disc pl-5 space-y-1 text-red-800">
            {cacLoi.tenCuaHang && <li>{cacLoi.tenCuaHang}</li>}
            {cacLoi.soZalo && <li>{cacLoi.soZalo}</li>}
            {cacLoi.soDienThoai && <li>{cacLoi.soDienThoai}</li>}
            {cacLoi.diaChi && <li>{cacLoi.diaChi}</li>}
            {cacLoi.danhSachSanPham && <li>{cacLoi.danhSachSanPham}</li>}
          </ul>
        </div>
      )}

      {loiAnh && (
        <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
          {loiAnh}
        </div>
      )}

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Cột trái: 5 nhóm nhập liệu chính */}
        <div className="lg:col-span-8 space-y-8">
          {/* NHÓM A: THÔNG TIN CƠ BẢN */}
          <section className="rounded-2xl border border-neutral-200 bg-white p-5 sm:p-6">
            <h2 className="text-lg font-bold text-neutral-900">A. Thông tin cơ bản</h2>
            <p className="mt-1 text-xs sm:text-sm text-neutral-500">
              Dùng tên tiệm hoặc tên quen gọi ở địa phương để bà con dễ nhớ, dễ tìm.
            </p>

            <div className="mt-5 space-y-5">
              <div>
                <label className="block text-sm font-semibold text-neutral-800 mb-1.5">
                  Ngành kinh doanh
                </label>
                <select
                  value={duLieu.nganh}
                  onChange={(e) =>
                    onCapNhat((cu) => ({ ...cu, nganh: e.target.value as MaNganh }))
                  }
                  className="w-full min-h-[44px] rounded-xl border border-neutral-300 bg-white px-3.5 py-2 text-sm text-neutral-900 focus:border-emerald-700 focus:outline-none"
                >
                  {GOI_Y_THEO_NGANH.map((g) => (
                    <option key={g.ma} value={g.ma}>
                      {g.ten}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label
                    htmlFor="ten-cua-hang"
                    className="block text-sm font-semibold text-neutral-800"
                  >
                    Tên cửa hàng / Hộ kinh doanh <span className="text-red-600">*</span>
                  </label>
                  <span className="text-xs text-neutral-500 tabular-nums">
                    {duLieu.tenCuaHang.length}/60
                  </span>
                </div>
                <input
                  id="ten-cua-hang"
                  type="text"
                  maxLength={60}
                  value={duLieu.tenCuaHang}
                  onBlur={() => setDaChamTruong((c) => ({ ...c, tenCuaHang: true }))}
                  onChange={(e) =>
                    onCapNhat((cu) => ({ ...cu, tenCuaHang: e.target.value }))
                  }
                  placeholder={`Ví dụ: ${goiYNganh.viDuCuaHang}`}
                  className={`w-full min-h-[44px] rounded-xl border px-3.5 py-2.5 text-sm text-neutral-900 focus:outline-none ${
                    hienLoi('tenCuaHang')
                      ? 'border-red-500 bg-red-50/30'
                      : 'border-neutral-300 focus:border-emerald-700'
                  }`}
                />
                {hienLoi('tenCuaHang') ? (
                  <p className="mt-1.5 text-xs font-medium text-red-600">
                    {hienLoi('tenCuaHang')}
                  </p>
                ) : (
                  <p className="mt-1 text-xs text-neutral-500">
                    Gợi ý: Có thể ghi thẳng tên quen gọi như &ldquo;Tâm Bún&rdquo;, &ldquo;Quán Bún Tâm&rdquo; hoặc kèm tên tiệm chính thức.
                  </p>
                )}
              </div>

              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                  <label
                    htmlFor="khau-hieu"
                    className="block text-sm font-semibold text-neutral-800"
                  >
                    Khẩu hiệu ngắn
                  </label>
                  <div className="flex items-center gap-3">
                    {goiYNganh.khauHieuMau && (
                      <button
                        type="button"
                        onClick={() =>
                          onCapNhat((cu) => ({ ...cu, khauHieu: goiYNganh.khauHieuMau }))
                        }
                        className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 hover:text-emerald-800 cursor-pointer"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Dùng gợi ý ngành</span>
                      </button>
                    )}
                    <span className="text-xs text-neutral-500 tabular-nums">
                      {duLieu.khauHieu.length}/100
                    </span>
                  </div>
                </div>
                <input
                  id="khau-hieu"
                  type="text"
                  maxLength={100}
                  value={duLieu.khauHieu}
                  onChange={(e) =>
                    onCapNhat((cu) => ({ ...cu, khauHieu: e.target.value }))
                  }
                  placeholder={goiYNganh.khauHieuMau || 'Ví dụ: Thơm ngon - Sạch sẽ - Giá bình dân'}
                  className="w-full min-h-[44px] rounded-xl border border-neutral-300 px-3.5 py-2.5 text-sm text-neutral-900 focus:border-emerald-700 focus:outline-none"
                />
              </div>
            </div>
          </section>

          {/* NHÓM B: LIÊN HỆ & HỘ KINH DOANH VIỆT NAM */}
          <section className="rounded-2xl border border-neutral-200 bg-white p-5 sm:p-6">
            <h2 className="text-lg font-bold text-neutral-900">
              B. Liên hệ Zalo, Địa chỉ &amp; Hộ kinh doanh
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-neutral-500">
              Khách hàng xem giá niêm yết rồi nhắn Zalo hoặc gọi trực tiếp cho bạn.
            </p>

            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="so-zalo" className="block text-sm font-semibold text-neutral-800 mb-1.5">
                  Số Zalo nhận đơn <span className="text-red-600">*</span>
                </label>
                <input
                  id="so-zalo"
                  type="tel"
                  inputMode="tel"
                  value={duLieu.soZalo}
                  onBlur={() => {
                    setDaChamTruong((c) => ({ ...c, soZalo: true }));
                    onCapNhat((cu) => {
                      const sach = chuanHoaSoDienThoai(cu.soZalo);
                      return {
                        ...cu,
                        soZalo: sach,
                        soDienThoai: cu.soDienThoai ? chuanHoaSoDienThoai(cu.soDienThoai) : sach,
                      };
                    });
                  }}
                  onChange={(e) => onCapNhat((cu) => ({ ...cu, soZalo: e.target.value }))}
                  placeholder="0909 123 456"
                  className={`w-full min-h-[44px] rounded-xl border px-3.5 py-2.5 text-sm text-neutral-900 tabular-nums focus:outline-none ${
                    hienLoi('soZalo')
                      ? 'border-red-500 bg-red-50/30'
                      : 'border-neutral-300 focus:border-emerald-700'
                  }`}
                />
                {hienLoi('soZalo') ? (
                  <p className="mt-1.5 text-xs font-medium text-red-600">{hienLoi('soZalo')}</p>
                ) : (
                  <p className="mt-1 text-xs text-neutral-500">
                    Đủ 10 số, tự tạo nút nhắn Zalo &amp; mã QR.
                  </p>
                )}
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label htmlFor="so-goi" className="block text-sm font-semibold text-neutral-800">
                    Số điện thoại gọi trực tiếp
                  </label>
                  {!dungChungSoZalo && duLieu.soZalo && (
                    <button
                      type="button"
                      onClick={() =>
                        onCapNhat((cu) => ({
                          ...cu,
                          soDienThoai: chuanHoaSoDienThoai(cu.soZalo),
                        }))
                      }
                      className="text-xs font-semibold text-emerald-700 cursor-pointer"
                    >
                      Dùng số Zalo
                    </button>
                  )}
                </div>
                <input
                  id="so-goi"
                  type="tel"
                  inputMode="tel"
                  value={duLieu.soDienThoai}
                  onBlur={() => {
                    setDaChamTruong((c) => ({ ...c, soDienThoai: true }));
                    onCapNhat((cu) => ({
                      ...cu,
                      soDienThoai: chuanHoaSoDienThoai(cu.soDienThoai),
                    }));
                  }}
                  onChange={(e) =>
                    onCapNhat((cu) => ({ ...cu, soDienThoai: e.target.value }))
                  }
                  placeholder="Để trống sẽ dùng chung số Zalo"
                  className="w-full min-h-[44px] rounded-xl border border-neutral-300 px-3.5 py-2.5 text-sm text-neutral-900 tabular-nums focus:border-emerald-700 focus:outline-none"
                />
                {kiemTraSoDienThoaiVN(duLieu.soDienThoai, 'Số điện thoại', false) &&
                  daChamTruong.soDienThoai && (
                    <p className="mt-1.5 text-xs font-medium text-red-600">
                      {kiemTraSoDienThoaiVN(duLieu.soDienThoai, 'Số điện thoại', false)}
                    </p>
                  )}
              </div>
            </div>

            <div className="mt-4 space-y-4">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label htmlFor="dia-chi" className="block text-sm font-semibold text-neutral-800">
                    Địa chỉ cửa hàng <span className="text-red-600">*</span>
                  </label>
                  <span className="text-xs text-neutral-500 tabular-nums">
                    {duLieu.diaChi.length}/150
                  </span>
                </div>
                <input
                  id="dia-chi"
                  type="text"
                  maxLength={150}
                  value={duLieu.diaChi}
                  onBlur={() => setDaChamTruong((c) => ({ ...c, diaChi: true }))}
                  onChange={(e) => onCapNhat((cu) => ({ ...cu, diaChi: e.target.value }))}
                  placeholder="Ví dụ: Số 12 Chợ Trảng Bàng, TX. Trảng Bàng, Tây Ninh"
                  className={`w-full min-h-[44px] rounded-xl border px-3.5 py-2.5 text-sm text-neutral-900 focus:outline-none ${
                    hienLoi('diaChi')
                      ? 'border-red-500 bg-red-50/30'
                      : 'border-neutral-300 focus:border-emerald-700'
                  }`}
                />
                {hienLoi('diaChi') && (
                  <p className="mt-1.5 text-xs font-medium text-red-600">{hienLoi('diaChi')}</p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="gio-mo-cua" className="block text-sm font-semibold text-neutral-800 mb-1.5">
                    Giờ mở cửa
                  </label>
                  <input
                    id="gio-mo-cua"
                    type="text"
                    value={duLieu.gioMoCua}
                    onChange={(e) => onCapNhat((cu) => ({ ...cu, gioMoCua: e.target.value }))}
                    placeholder="Ví dụ: 05:30 – 20:00 hằng ngày"
                    className="w-full min-h-[44px] rounded-xl border border-neutral-300 px-3.5 py-2.5 text-sm text-neutral-900 focus:border-emerald-700 focus:outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="link-ban-do" className="block text-sm font-semibold text-neutral-800 mb-1.5">
                    Link Google Maps (tùy chọn)
                  </label>
                  <input
                    id="link-ban-do"
                    type="url"
                    value={duLieu.linkBanDo}
                    onChange={(e) => onCapNhat((cu) => ({ ...cu, linkBanDo: e.target.value }))}
                    placeholder="Để trống sẽ tự tạo từ địa chỉ"
                    className="w-full min-h-[44px] rounded-xl border border-neutral-300 px-3.5 py-2.5 text-sm text-neutral-900 focus:border-emerald-700 focus:outline-none"
                  />
                  {duLieu.diaChi.trim() && !duLieu.linkBanDo.trim() && (
                    <a
                      href={taoLinkBanDo(duLieu.diaChi)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 inline-block text-xs text-emerald-700 underline"
                    >
                      Kiểm tra link tự tạo từ địa chỉ
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* PHẦN MỞ RỘNG CHO HỘ KINH DOANH VIỆT NAM */}
            <div className="mt-6 border-t border-neutral-200 pt-5">
              <button
                type="button"
                onClick={() => setMoMoRongHkd((v) => !v)}
                className="flex w-full items-center justify-between gap-3 text-left cursor-pointer"
              >
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-neutral-900">
                    Tùy chọn mở rộng cho Hộ kinh doanh Việt Nam
                  </h3>
                  <p className="text-xs text-neutral-500 mt-0.5">
                    Người bán rõ ràng, khu vực phục vụ giới hạn, lưu ý chỉ niêm yết giá (không giỏ hàng)
                  </p>
                </div>
                {moMoRongHkd ? (
                  <ChevronUp className="w-5 h-5 text-neutral-500 shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-neutral-500 shrink-0" />
                )}
              </button>

              {moMoRongHkd && (
                <div className="mt-4 space-y-4 rounded-xl bg-neutral-50 p-4 border border-neutral-200">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-xs sm:text-sm font-medium text-neutral-800">
                      Hiển thị khối thông tin người bán &amp; lưu ý niêm yết giá trên trang
                    </span>
                    <input
                      type="checkbox"
                      checked={duLieu.hoKinhDoanh.hienThongTinPhapLy}
                      onChange={(e) =>
                        onCapNhat((cu) => ({
                          ...cu,
                          hoKinhDoanh: {
                            ...cu.hoKinhDoanh,
                            hienThongTinPhapLy: e.target.checked,
                          },
                        }))
                      }
                      className="h-5 w-5 accent-emerald-700 cursor-pointer"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 mb-1">
                        Tên chủ hộ / Người bán hàng
                      </label>
                      <input
                        type="text"
                        value={duLieu.hoKinhDoanh.tenChuHo}
                        onChange={(e) =>
                          onCapNhat((cu) => ({
                            ...cu,
                            hoKinhDoanh: { ...cu.hoKinhDoanh, tenChuHo: e.target.value },
                          }))
                        }
                        placeholder="Ví dụ: Ông Trần Văn Trọng"
                        className="w-full min-h-[42px] rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm focus:border-emerald-700 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 mb-1">
                        Mã số Hộ kinh doanh / ĐKKD (nếu có)
                      </label>
                      <input
                        type="text"
                        value={duLieu.hoKinhDoanh.maSoHoKinhDoanh}
                        onChange={(e) =>
                          onCapNhat((cu) => ({
                            ...cu,
                            hoKinhDoanh: {
                              ...cu.hoKinhDoanh,
                              maSoHoKinhDoanh: e.target.value,
                            },
                          }))
                        }
                        placeholder="Ví dụ: HKD-45A8012345 (để trống nếu chưa có)"
                        className="w-full min-h-[42px] rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm focus:border-emerald-700 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">
                      Khu vực phục vụ / Phạm vi giao hàng
                    </label>
                    <input
                      type="text"
                      value={duLieu.hoKinhDoanh.khuVucPhucVu}
                      onChange={(e) =>
                        onCapNhat((cu) => ({
                          ...cu,
                          hoKinhDoanh: { ...cu.hoKinhDoanh, khuVucPhucVu: e.target.value },
                        }))
                      }
                      placeholder="Ví dụ: Giao nhanh nội thị Trảng Bàng & bán kính 8km"
                      className="w-full min-h-[42px] rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm focus:border-emerald-700 focus:outline-none"
                    />
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {GOI_Y_KHU_VUC_NHANH.map((mau) => (
                        <button
                          key={mau}
                          type="button"
                          onClick={() =>
                            onCapNhat((cu) => ({
                              ...cu,
                              hoKinhDoanh: { ...cu.hoKinhDoanh, khuVucPhucVu: mau },
                            }))
                          }
                          className="rounded-md border border-neutral-200 bg-white px-2.5 py-1 text-xs text-neutral-700 hover:border-emerald-600 hover:text-emerald-800 cursor-pointer"
                        >
                          + {mau}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">
                      Lưu ý hình thức bán hàng (niêm yết giá, không giỏ hàng)
                    </label>
                    <textarea
                      rows={2}
                      value={duLieu.hoKinhDoanh.hinhThucBanHang}
                      onChange={(e) =>
                        onCapNhat((cu) => ({
                          ...cu,
                          hoKinhDoanh: {
                            ...cu.hoKinhDoanh,
                            hinhThucBanHang: e.target.value,
                          },
                        }))
                      }
                      className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm focus:border-emerald-700 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">
                      Chính sách giao nhận / kiểm tra hàng (tùy chọn)
                    </label>
                    <input
                      type="text"
                      value={duLieu.hoKinhDoanh.chinhSachGiaoHang}
                      onChange={(e) =>
                        onCapNhat((cu) => ({
                          ...cu,
                          hoKinhDoanh: {
                            ...cu.hoKinhDoanh,
                            chinhSachGiaoHang: e.target.value,
                          },
                        }))
                      }
                      placeholder="Ví dụ: Miễn phí giao đơn từ 200.000đ trong phường · Kiểm tra hàng trước khi trả tiền"
                      className="w-full min-h-[42px] rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm focus:border-emerald-700 focus:outline-none"
                    />
                  </div>

                  {/* Mục mở rộng tự thêm cho hộ kinh doanh */}
                  <div className="pt-2 border-t border-neutral-200">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-xs font-semibold text-neutral-700">
                        Thông tin mở rộng khác (Chứng nhận ATTP, OCOP, ghi chú riêng...)
                      </span>
                      {duLieu.hoKinhDoanh.thongTinMoRong.length < SO_THONG_TIN_MO_RONG_TOI_DA && (
                        <button
                          type="button"
                          onClick={themThongTinMoRongHkd}
                          className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 hover:text-emerald-800 cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Thêm mục</span>
                        </button>
                      )}
                    </div>

                    {duLieu.hoKinhDoanh.thongTinMoRong.length > 0 && (
                      <div className="space-y-2">
                        {duLieu.hoKinhDoanh.thongTinMoRong.map((muc) => (
                          <div key={muc.id} className="grid grid-cols-1 sm:grid-cols-12 gap-2">
                            <input
                              type="text"
                              value={muc.nhan}
                              onChange={(e) =>
                                onCapNhat((cu) => ({
                                  ...cu,
                                  hoKinhDoanh: {
                                    ...cu.hoKinhDoanh,
                                    thongTinMoRong: cu.hoKinhDoanh.thongTinMoRong.map((m) =>
                                      m.id === muc.id ? { ...m, nhan: e.target.value } : m
                                    ),
                                  },
                                }))
                              }
                              placeholder="Tên mục (VD: Chứng nhận ATTP)"
                              className="sm:col-span-4 min-h-[40px] rounded-lg border border-neutral-300 bg-white px-3 py-1.5 text-xs sm:text-sm"
                            />
                            <input
                              type="text"
                              value={muc.giaTri}
                              onChange={(e) =>
                                onCapNhat((cu) => ({
                                  ...cu,
                                  hoKinhDoanh: {
                                    ...cu.hoKinhDoanh,
                                    thongTinMoRong: cu.hoKinhDoanh.thongTinMoRong.map((m) =>
                                      m.id === muc.id ? { ...m, giaTri: e.target.value } : m
                                    ),
                                  },
                                }))
                              }
                              placeholder="Nội dung hiển thị"
                              className="sm:col-span-7 min-h-[40px] rounded-lg border border-neutral-300 bg-white px-3 py-1.5 text-xs sm:text-sm"
                            />
                            <button
                              type="button"
                              onClick={() =>
                                onCapNhat((cu) => ({
                                  ...cu,
                                  hoKinhDoanh: {
                                    ...cu.hoKinhDoanh,
                                    thongTinMoRong: cu.hoKinhDoanh.thongTinMoRong.filter(
                                      (m) => m.id !== muc.id
                                    ),
                                  },
                                }))
                              }
                              className="sm:col-span-1 min-h-[40px] flex items-center justify-center rounded-lg border border-neutral-200 bg-white text-red-600 hover:bg-red-50 cursor-pointer"
                              aria-label="Xóa mục thông tin"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Mạng xã hội */}
            <div className="mt-5 border-t border-neutral-200 pt-4">
              <button
                type="button"
                onClick={() => setMoMangXaHoi((v) => !v)}
                className="flex w-full items-center justify-between text-left cursor-pointer"
              >
                <span className="text-sm font-semibold text-neutral-800">
                  Liên kết Facebook, TikTok, Instagram (tùy chọn)
                </span>
                {moMangXaHoi ? (
                  <ChevronUp className="w-4 h-4 text-neutral-500" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-neutral-500" />
                )}
              </button>

              {moMangXaHoi && (
                <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-neutral-600 mb-1">
                      Facebook
                    </label>
                    <input
                      type="text"
                      value={duLieu.mangXaHoi.facebook}
                      onBlur={() =>
                        onCapNhat((cu) => ({
                          ...cu,
                          mangXaHoi: {
                            ...cu.mangXaHoi,
                            facebook: chuanHoaLinkMangXaHoi('facebook', cu.mangXaHoi.facebook),
                          },
                        }))
                      }
                      onChange={(e) =>
                        onCapNhat((cu) => ({
                          ...cu,
                          mangXaHoi: { ...cu.mangXaHoi, facebook: e.target.value },
                        }))
                      }
                      placeholder="Tên trang hoặc link"
                      className="w-full min-h-[42px] rounded-xl border border-neutral-300 px-3 py-2 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-neutral-600 mb-1">
                      TikTok
                    </label>
                    <input
                      type="text"
                      value={duLieu.mangXaHoi.tiktok}
                      onBlur={() =>
                        onCapNhat((cu) => ({
                          ...cu,
                          mangXaHoi: {
                            ...cu.mangXaHoi,
                            tiktok: chuanHoaLinkMangXaHoi('tiktok', cu.mangXaHoi.tiktok),
                          },
                        }))
                      }
                      onChange={(e) =>
                        onCapNhat((cu) => ({
                          ...cu,
                          mangXaHoi: { ...cu.mangXaHoi, tiktok: e.target.value },
                        }))
                      }
                      placeholder="@taikhoan hoặc link"
                      className="w-full min-h-[42px] rounded-xl border border-neutral-300 px-3 py-2 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-neutral-600 mb-1">
                      Instagram
                    </label>
                    <input
                      type="text"
                      value={duLieu.mangXaHoi.instagram}
                      onBlur={() =>
                        onCapNhat((cu) => ({
                          ...cu,
                          mangXaHoi: {
                            ...cu.mangXaHoi,
                            instagram: chuanHoaLinkMangXaHoi('instagram', cu.mangXaHoi.instagram),
                          },
                        }))
                      }
                      onChange={(e) =>
                        onCapNhat((cu) => ({
                          ...cu,
                          mangXaHoi: { ...cu.mangXaHoi, instagram: e.target.value },
                        }))
                      }
                      placeholder="Tên tài khoản hoặc link"
                      className="w-full min-h-[42px] rounded-xl border border-neutral-300 px-3 py-2 text-sm"
                    />
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* NHÓM C: SẢN PHẨM / DỊCH VỤ NIÊM YẾT GIÁ */}
          <section className="rounded-2xl border border-neutral-200 bg-white p-5 sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <h2 className="text-lg font-bold text-neutral-900">
                  C. Sản phẩm &amp; Bảng giá niêm yết ({duLieu.danhSachSanPham.length}/
                  {SO_SAN_PHAM_TOI_DA})
                </h2>
                <p className="mt-1 text-xs sm:text-sm text-neutral-500">
                  Thêm tối đa 12 sản phẩm/dịch vụ. Có thể đổi thứ tự lên xuống hoặc ẩn giá để khách nhắn Zalo.
                </p>
              </div>
              {duLieu.danhSachSanPham.length < SO_SAN_PHAM_TOI_DA && (
                <button
                  type="button"
                  onClick={themSanPham}
                  className="inline-flex items-center gap-1.5 min-h-[42px] rounded-xl bg-emerald-700 px-3.5 py-2 text-xs sm:text-sm font-semibold text-white hover:bg-emerald-800 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Thêm sản phẩm</span>
                </button>
              )}
            </div>

            <div className="mt-5 space-y-4">
              {duLieu.danhSachSanPham.map((sp, chiSo) => {
                const loiTenSp =
                  (daChamTruong[`sp_${sp.id}`] || daNhanTiepTuc) &&
                  cacLoi.chiTietSanPham?.[sp.id];

                return (
                  <div
                    key={sp.id}
                    className="rounded-xl border border-neutral-200 bg-neutral-50/70 p-4 space-y-3.5"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-bold text-neutral-500 tabular-nums">
                        Mục #{chiSo + 1}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <label className="inline-flex items-center gap-1.5 mr-2 text-xs font-medium text-neutral-700 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={sp.noiBat}
                            onChange={(e) =>
                              capNhatSanPham(sp.id, { noiBat: e.target.checked })
                            }
                            className="h-4 w-4 accent-emerald-700"
                          />
                          <span>Nổi bật</span>
                        </label>
                        <button
                          type="button"
                          disabled={chiSo === 0}
                          onClick={() => doiViTriSanPham(chiSo, -1)}
                          className="min-h-[36px] min-w-[36px] flex items-center justify-center rounded-lg border border-neutral-200 bg-white text-neutral-600 disabled:opacity-35 hover:bg-neutral-100 cursor-pointer"
                          aria-label="Đưa lên trên"
                        >
                          <ArrowUp className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          disabled={chiSo === duLieu.danhSachSanPham.length - 1}
                          onClick={() => doiViTriSanPham(chiSo, 1)}
                          className="min-h-[36px] min-w-[36px] flex items-center justify-center rounded-lg border border-neutral-200 bg-white text-neutral-600 disabled:opacity-35 hover:bg-neutral-100 cursor-pointer"
                          aria-label="Đưa xuống dưới"
                        >
                          <ArrowDown className="w-4 h-4" />
                        </button>
                        {duLieu.danhSachSanPham.length > 1 && (
                          <button
                            type="button"
                            onClick={() => xoaSanPham(sp.id)}
                            className="min-h-[36px] min-w-[36px] flex items-center justify-center rounded-lg border border-red-200 bg-white text-red-600 hover:bg-red-50 cursor-pointer"
                            aria-label="Xóa sản phẩm"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                      <div className="sm:col-span-6">
                        <div className="flex justify-between mb-1">
                          <label className="text-xs font-semibold text-neutral-700">
                            Tên sản phẩm / dịch vụ <span className="text-red-600">*</span>
                          </label>
                          <span className="text-[11px] text-neutral-400 tabular-nums">
                            {sp.ten.length}/50
                          </span>
                        </div>
                        <input
                          type="text"
                          maxLength={50}
                          value={sp.ten}
                          onBlur={() =>
                            setDaChamTruong((c) => ({ ...c, [`sp_${sp.id}`]: true }))
                          }
                          onChange={(e) => capNhatSanPham(sp.id, { ten: e.target.value })}
                          placeholder="Ví dụ: Bún Tươi Thủ Công"
                          className={`w-full min-h-[42px] rounded-lg border bg-white px-3 py-2 text-sm focus:outline-none ${
                            loiTenSp
                              ? 'border-red-500'
                              : 'border-neutral-300 focus:border-emerald-700'
                          }`}
                        />
                        {loiTenSp && (
                          <p className="mt-1 text-xs font-medium text-red-600">{loiTenSp}</p>
                        )}
                      </div>

                      <div className="sm:col-span-6">
                        <label className="block text-xs font-semibold text-neutral-700 mb-1">
                          Kiểu hiển thị giá
                        </label>
                        <select
                          value={sp.kieuGia}
                          onChange={(e) =>
                            capNhatSanPham(sp.id, {
                              kieuGia: e.target.value as KieuGiaSanPham,
                            })
                          }
                          className="w-full min-h-[42px] rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm focus:border-emerald-700 focus:outline-none"
                        >
                          <option value="coGia">Niêm yết giá cụ thể (VD: 17.000đ)</option>
                          <option value="lienHeDeBiet">Hiện "Liên hệ để được tư vấn"</option>
                          <option value="anGia">Ẩn giá (Hiện "Nhắn Zalo xem giá")</option>
                        </select>
                      </div>
                    </div>

                    {sp.kieuGia === 'coGia' && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-semibold text-neutral-700 mb-1">
                            Giá (đồng){' '}
                            {sp.gia !== null && sp.gia > 0 && (
                              <span className="text-emerald-700 font-bold tabular-nums">
                                · Hiển thị: {dinhDangGiaTien(sp.gia)}
                              </span>
                            )}
                          </label>
                          <input
                            type="number"
                            min={0}
                            step={1000}
                            inputMode="numeric"
                            value={sp.gia ?? ''}
                            onChange={(e) => {
                              const val = e.target.value;
                              capNhatSanPham(sp.id, {
                                gia: val === '' ? null : Math.max(0, Math.round(Number(val))),
                              });
                            }}
                            placeholder="Ví dụ: 17000"
                            className="w-full min-h-[42px] rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm tabular-nums focus:border-emerald-700 focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-neutral-700 mb-1">
                            Đơn vị tính
                          </label>
                          <input
                            type="text"
                            value={sp.donVi}
                            onChange={(e) => capNhatSanPham(sp.id, { donVi: e.target.value })}
                            placeholder="VD: kg, 0.5kg, hộp, phần, lần"
                            className="w-full min-h-[42px] rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm focus:border-emerald-700 focus:outline-none"
                          />
                        </div>
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-start">
                      <div className="sm:col-span-8">
                        <div className="flex justify-between mb-1">
                          <label className="text-xs font-semibold text-neutral-700">
                            Mô tả ngắn (tùy chọn)
                          </label>
                          <span className="text-[11px] text-neutral-400 tabular-nums">
                            {sp.moTa.length}/80
                          </span>
                        </div>
                        <input
                          type="text"
                          maxLength={80}
                          value={sp.moTa}
                          onChange={(e) => capNhatSanPham(sp.id, { moTa: e.target.value })}
                          placeholder="Ví dụ: Làm mới mỗi sáng, không chất bảo quản"
                          className="w-full min-h-[42px] rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm focus:border-emerald-700 focus:outline-none"
                        />
                      </div>

                      <div className="sm:col-span-4">
                        <label className="block text-xs font-semibold text-neutral-700 mb-1">
                          Ảnh sản phẩm
                        </label>
                        <div className="flex items-center gap-2">
                          {sp.anh && (
                            <img
                              src={sp.anh}
                              alt={sp.ten}
                              className="h-10 w-10 rounded-lg object-cover border border-neutral-200 shrink-0"
                            />
                          )}
                          <label className="flex-1 inline-flex items-center justify-center gap-1.5 min-h-[42px] rounded-lg border border-neutral-300 bg-white px-3 py-1.5 text-xs font-medium text-neutral-700 hover:bg-neutral-50 cursor-pointer truncate">
                            <ImagePlus className="w-4 h-4 text-emerald-700 shrink-0" />
                            <span className="truncate">
                              {dangNenAnh === sp.id
                                ? 'Đang nén...'
                                : sp.anh
                                  ? 'Đổi ảnh'
                                  : 'Chọn ảnh'}
                            </span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) =>
                                xuLyTaiAnh(e.target.files?.[0], sp.id, (url) =>
                                  capNhatSanPham(sp.id, { anh: url })
                                )
                              }
                            />
                          </label>
                          {sp.anh && (
                            <button
                              type="button"
                              onClick={() => capNhatSanPham(sp.id, { anh: null })}
                              className="min-h-[42px] px-2 text-xs text-red-600 hover:bg-red-50 rounded-lg cursor-pointer"
                              aria-label="Xóa ảnh sản phẩm"
                            >
                              Xóa
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

              {duLieu.danhSachSanPham.length < SO_SAN_PHAM_TOI_DA && (
                <button
                  type="button"
                  onClick={themSanPham}
                  className="w-full min-h-[44px] rounded-xl border border-dashed border-neutral-300 py-2.5 text-sm font-semibold text-emerald-800 hover:border-emerald-600 hover:bg-emerald-50/40 cursor-pointer"
                >
                  + Thêm sản phẩm / dịch vụ khác
                </button>
              )}
            </div>
          </section>

          {/* NHÓM D: GIỚI THIỆU & CÂU CẢM ƠN */}
          <section className="rounded-2xl border border-neutral-200 bg-white p-5 sm:p-6">
            <h2 className="text-lg font-bold text-neutral-900">
              D. Giới thiệu cửa hàng &amp; Điểm nổi bật
            </h2>
            <div className="mt-4 space-y-5">
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                  <label htmlFor="doan-gioi-thieu" className="text-sm font-semibold text-neutral-800">
                    Đoạn giới thiệu
                  </label>
                  <div className="flex items-center gap-3">
                    {goiYNganh.doanGioiThieuMau && (
                      <button
                        type="button"
                        onClick={() =>
                          onCapNhat((cu) => ({
                            ...cu,
                            gioiThieu: {
                              ...cu.gioiThieu,
                              doanVan: goiYNganh.doanGioiThieuMau,
                            },
                          }))
                        }
                        className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 cursor-pointer"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Điền gợi ý mẫu</span>
                      </button>
                    )}
                    <span className="text-xs text-neutral-500 tabular-nums">
                      {duLieu.gioiThieu.doanVan.length}/400
                    </span>
                  </div>
                </div>
                <textarea
                  id="doan-gioi-thieu"
                  rows={4}
                  maxLength={400}
                  value={duLieu.gioiThieu.doanVan}
                  onChange={(e) =>
                    onCapNhat((cu) => ({
                      ...cu,
                      gioiThieu: { ...cu.gioiThieu, doanVan: e.target.value },
                    }))
                  }
                  placeholder="Kể ngắn gọn về nguồn gốc sản phẩm, kinh nghiệm làm nghề hoặc cam kết phục vụ bà con địa phương..."
                  className="w-full rounded-xl border border-neutral-300 px-3.5 py-2.5 text-sm text-neutral-900 focus:border-emerald-700 focus:outline-none"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-semibold text-neutral-800">
                    Điểm nổi bật ({duLieu.gioiThieu.diemNoiBat.length}/{SO_DIEM_NOI_BAT_TOI_DA})
                  </label>
                  {duLieu.gioiThieu.diemNoiBat.length < SO_DIEM_NOI_BAT_TOI_DA && (
                    <button
                      type="button"
                      onClick={themDiemNoiBat}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Thêm điểm nổi bật</span>
                    </button>
                  )}
                </div>

                <div className="space-y-2">
                  {duLieu.gioiThieu.diemNoiBat.map((diem, idx) => (
                    <div key={idx} className="flex gap-2">
                      <input
                        type="text"
                        maxLength={40}
                        value={diem}
                        onChange={(e) =>
                          onCapNhat((cu) => {
                            const moi = [...cu.gioiThieu.diemNoiBat];
                            moi[idx] = e.target.value;
                            return {
                              ...cu,
                              gioiThieu: { ...cu.gioiThieu, diemNoiBat: moi },
                            };
                          })
                        }
                        placeholder="Ví dụ: Nguyên liệu tươi mỗi ngày"
                        className="flex-1 min-h-[42px] rounded-xl border border-neutral-300 px-3 py-2 text-sm"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          onCapNhat((cu) => ({
                            ...cu,
                            gioiThieu: {
                              ...cu.gioiThieu,
                              diemNoiBat: cu.gioiThieu.diemNoiBat.filter((_, i) => i !== idx),
                            },
                          }))
                        }
                        className="min-h-[42px] min-w-[42px] flex items-center justify-center rounded-xl border border-neutral-200 text-red-600 hover:bg-red-50 cursor-pointer"
                        aria-label="Xóa điểm nổi bật"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label htmlFor="cau-cam-on" className="block text-sm font-semibold text-neutral-800 mb-1.5">
                  Câu cảm ơn cuối trang
                </label>
                <input
                  id="cau-cam-on"
                  type="text"
                  value={duLieu.cauCamOn}
                  onChange={(e) => onCapNhat((cu) => ({ ...cu, cauCamOn: e.target.value }))}
                  placeholder="Cảm ơn bạn đã ủng hộ!"
                  className="w-full min-h-[44px] rounded-xl border border-neutral-300 px-3.5 py-2.5 text-sm"
                />
              </div>
            </div>
          </section>

          {/* NHÓM E: HÌNH ẢNH CỬA HÀNG */}
          <section className="rounded-2xl border border-neutral-200 bg-white p-5 sm:p-6">
            <h2 className="text-lg font-bold text-neutral-900">E. Hình ảnh cửa hàng (tùy chọn)</h2>
            <p className="mt-1 text-xs sm:text-sm text-neutral-500">
              Ảnh tự thu nhỏ vừa nhẹ vừa nét để trang tải nhanh trên điện thoại. Nếu chưa có ảnh, giao diện tự dùng nền màu và họa tiết.
            </p>

            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="rounded-xl border border-neutral-200 p-4">
                <div className="text-sm font-semibold text-neutral-800 mb-2">
                  Ảnh bìa đầu trang (Banner)
                </div>
                {duLieu.anhBanner ? (
                  <img
                    src={duLieu.anhBanner}
                    alt="Ảnh bìa cửa hàng"
                    className="mb-3 h-36 w-full rounded-lg object-cover border border-neutral-200"
                  />
                ) : (
                  <div className="mb-3 h-36 w-full rounded-lg bg-neutral-100 flex items-center justify-center text-xs text-neutral-500">
                    Chưa có ảnh bìa (dùng nền họa tiết)
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <label className="flex-1 inline-flex items-center justify-center gap-1.5 min-h-[42px] rounded-lg border border-neutral-300 bg-white px-3 py-2 text-xs font-semibold text-neutral-800 hover:bg-neutral-50 cursor-pointer">
                    <ImagePlus className="w-4 h-4 text-emerald-700" />
                    <span>
                      {dangNenAnh === 'anhBanner'
                        ? 'Đang nén ảnh...'
                        : duLieu.anhBanner
                          ? 'Đổi ảnh bìa'
                          : 'Tải ảnh bìa'}
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) =>
                        xuLyTaiAnh(e.target.files?.[0], 'anhBanner', (url) =>
                          onCapNhat((cu) => ({ ...cu, anhBanner: url }))
                        )
                      }
                    />
                  </label>
                  {duLieu.anhBanner && (
                    <button
                      type="button"
                      onClick={() => onCapNhat((cu) => ({ ...cu, anhBanner: null }))}
                      className="min-h-[42px] px-3 text-xs font-medium text-red-600 hover:bg-red-50 rounded-lg cursor-pointer"
                    >
                      Xóa
                    </button>
                  )}
                </div>
              </div>

              <div className="rounded-xl border border-neutral-200 p-4">
                <div className="text-sm font-semibold text-neutral-800 mb-2">
                  Ảnh mặt tiền / không gian quán
                </div>
                {duLieu.anhCuaHang ? (
                  <img
                    src={duLieu.anhCuaHang}
                    alt="Ảnh cửa hàng"
                    className="mb-3 h-36 w-full rounded-lg object-cover border border-neutral-200"
                  />
                ) : (
                  <div className="mb-3 h-36 w-full rounded-lg bg-neutral-100 flex items-center justify-center text-xs text-neutral-500">
                    Hiển thị cùng khối địa chỉ
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <label className="flex-1 inline-flex items-center justify-center gap-1.5 min-h-[42px] rounded-lg border border-neutral-300 bg-white px-3 py-2 text-xs font-semibold text-neutral-800 hover:bg-neutral-50 cursor-pointer">
                    <ImagePlus className="w-4 h-4 text-emerald-700" />
                    <span>
                      {dangNenAnh === 'anhCuaHang'
                        ? 'Đang nén ảnh...'
                        : duLieu.anhCuaHang
                          ? 'Đổi ảnh quán'
                          : 'Tải ảnh quán'}
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) =>
                        xuLyTaiAnh(e.target.files?.[0], 'anhCuaHang', (url) =>
                          onCapNhat((cu) => ({ ...cu, anhCuaHang: url }))
                        )
                      }
                    />
                  </label>
                  {duLieu.anhCuaHang && (
                    <button
                      type="button"
                      onClick={() => onCapNhat((cu) => ({ ...cu, anhCuaHang: null }))}
                      className="min-h-[42px] px-3 text-xs font-medium text-red-600 hover:bg-red-50 rounded-lg cursor-pointer"
                    >
                      Xóa
                    </button>
                  )}
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Cột phải: Tóm tắt kiểm tra & nút chuyển bước trên máy tính */}
        <aside className="hidden lg:block lg:col-span-4 sticky top-24 space-y-4">
          <div className="rounded-2xl border border-neutral-200 bg-white p-5 space-y-4">
            <h2 className="text-base font-bold text-neutral-900">Kiểm tra trước khi xem mẫu</h2>
            <ul className="space-y-2.5 text-sm">
              <li className="flex items-center justify-between gap-2">
                <span className="text-neutral-600">Tên cửa hàng</span>
                <span className={cacLoi.tenCuaHang ? 'text-red-600 font-medium' : 'text-emerald-700 font-semibold'}>
                  {cacLoi.tenCuaHang ? 'Chưa đạt' : 'Đã xong'}
                </span>
              </li>
              <li className="flex items-center justify-between gap-2">
                <span className="text-neutral-600">Số Zalo liên hệ</span>
                <span className={cacLoi.soZalo ? 'text-red-600 font-medium' : 'text-emerald-700 font-semibold'}>
                  {cacLoi.soZalo ? 'Chưa hợp lệ' : 'Đã xong'}
                </span>
              </li>
              <li className="flex items-center justify-between gap-2">
                <span className="text-neutral-600">Địa chỉ</span>
                <span className={cacLoi.diaChi ? 'text-red-600 font-medium' : 'text-emerald-700 font-semibold'}>
                  {cacLoi.diaChi ? 'Còn thiếu' : 'Đã xong'}
                </span>
              </li>
              <li className="flex items-center justify-between gap-2">
                <span className="text-neutral-600">Sản phẩm niêm yết</span>
                <span className={cacLoi.danhSachSanPham ? 'text-red-600 font-medium' : 'text-emerald-700 font-semibold tabular-nums'}>
                  {duLieu.danhSachSanPham.length} mục
                </span>
              </li>
            </ul>

            <button
              type="button"
              onClick={xuLyTiepTuc}
              className="w-full inline-flex items-center justify-center gap-2 min-h-[48px] rounded-xl bg-emerald-700 px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-800 transition-colors cursor-pointer"
            >
              <span>Xem trước các giao diện</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <p className="text-xs text-neutral-500 leading-relaxed">
              Bản nháp tự động lưu vào trình duyệt sau mỗi lần bạn ngừng nhập 1 giây.
            </p>
          </div>
        </aside>
      </div>

      {/* Thanh nút cố định dưới màn hình cho điện thoại để dễ bấm bằng 1 tay */}
      <div className="fixed bottom-0 left-0 right-0 z-30 border-t border-neutral-200 bg-white/95 backdrop-blur-sm p-3 lg:hidden">
        <div className="mx-auto flex max-w-xl items-center gap-3">
          <button
            type="button"
            onClick={onQuayLaiBuoc1}
            className="min-h-[46px] rounded-xl border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-700 cursor-pointer"
          >
            Quay lại
          </button>
          <button
            type="button"
            onClick={xuLyTiepTuc}
            className="flex-1 inline-flex items-center justify-center gap-2 min-h-[46px] rounded-xl bg-emerald-700 px-4 py-2 text-sm font-semibold text-white cursor-pointer"
          >
            <span>Xem trước theme</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
