import React, { useState } from 'react';
import {
  ArrowDown,
  ArrowLeft,
  ArrowUp,
  Check,
  Download,
  ExternalLink,
  Eye,
  EyeOff,
  FileArchive,
  FileJson,
  Globe,
  ImagePlus,
  Monitor,
  Palette,
  Smartphone,
} from 'lucide-react';
import { layThemeTheoMa } from '../giaoDien/danhSachGiaoDien';
import {
  DuLieuCuaHang,
  MaKhoiHienThi,
  TEN_KHOI_HIEN_THI,
} from '../kieuDuLieu';
import { nenVaThuNhoAnh } from '../tienIch/xuLyAnh';
import { taoTenFileAnToan } from '../tienIch/xuLyDuLieu';
import {
  dayLenGitHubPages,
  luuDuAnJson,
  xuatFileHtmlDon,
  xuatFileZip,
} from '../tienIch/xuatBanTrang';
import { KhungXemTruocTheme } from './KhungXemTruocTheme';

interface Buoc4ChinhVaXuatProps {
  duLieu: DuLieuCuaHang;
  maQrSvg: string;
  onCapNhat: (capNhat: (cu: DuLieuCuaHang) => DuLieuCuaHang) => void;
  onQuayLaiBuoc3: () => void;
}

const TAT_CA_KHOI: MaKhoiHienThi[] = [
  'dauTrang',
  'banner',
  'sanPham',
  'gioiThieu',
  'hoKinhDoanh',
  'diaChi',
  'lienHe',
  'cauCamOn',
];

export const Buoc4ChinhVaXuat: React.FC<Buoc4ChinhVaXuatProps> = ({
  duLieu,
  maQrSvg,
  onCapNhat,
  onQuayLaiBuoc3,
}) => {
  const theme = layThemeTheoMa(duLieu.giaoDien.maTheme);
  const mauDangDung = duLieu.giaoDien.mauChinh || theme.bangMau.chinh;

  const [cheDoXem, setCheDoXem] = useState<'dienThoai' | 'mayTinh'>('dienThoai');
  const [thongBaoXuat, setThongBaoXuat] = useState<string | null>(null);
  const [dangXuat, setDangXuat] = useState<string | null>(null);

  // GitHub Pages state
  const [moGitHub, setMoGitHub] = useState(false);
  const [tokenGithub, setTokenGithub] = useState('');
  const [tenKhoGithub, setTenKhoGithub] = useState(
    taoTenFileAnToan(duLieu.tenCuaHang || 'trang-cua-hang')
  );
  const [ketQuaGithub, setKetQuaGithub] = useState<{ urlTrang: string; urlKho: string } | null>(
    null
  );
  const [loiGithub, setLoiGithub] = useState<string | null>(null);

  const batTatKhoi = (maKhoi: MaKhoiHienThi) => {
    onCapNhat((cu) => {
      const dangCo = cu.giaoDien.cacKhoiHienThi.includes(maKhoi);
      const moi = dangCo
        ? cu.giaoDien.cacKhoiHienThi.filter((k) => k !== maKhoi)
        : [...cu.giaoDien.cacKhoiHienThi, maKhoi];
      return {
        ...cu,
        giaoDien: { ...cu.giaoDien, cacKhoiHienThi: moi },
      };
    });
  };

  const doiThuTuKhoi = (maKhoi: MaKhoiHienThi, huong: -1 | 1) => {
    onCapNhat((cu) => {
      const danhSach = [...cu.giaoDien.cacKhoiHienThi];
      const chiSo = danhSach.indexOf(maKhoi);
      if (chiSo < 0) return cu;
      const dich = chiSo + huong;
      if (dich < 0 || dich >= danhSach.length) return cu;
      const tam = danhSach[chiSo];
      danhSach[chiSo] = danhSach[dich];
      danhSach[dich] = tam;
      return {
        ...cu,
        giaoDien: { ...cu.giaoDien, cacKhoiHienThi: danhSach },
      };
    });
  };

  // Danh sách hiển thị kết hợp thứ tự đang bật + các khối đang tắt ở cuối
  const danhSachKhoiSapXep = [
    ...duLieu.giaoDien.cacKhoiHienThi,
    ...TAT_CA_KHOI.filter((k) => !duLieu.giaoDien.cacKhoiHienThi.includes(k)),
  ];

  const xuLyDoiBannerNhanh = async (file: File | undefined) => {
    if (!file) return;
    try {
      const anhMoi = await nenVaThuNhoAnh(file);
      onCapNhat((cu) => ({ ...cu, anhBanner: anhMoi }));
    } catch {
      // Bỏ qua nếu ảnh không hợp lệ
    }
  };

  const xuLyTaiHtml = async () => {
    setDangXuat('html');
    setThongBaoXuat(null);
    try {
      await xuatFileHtmlDon(duLieu, theme);
      setThongBaoXuat('Đã tải xuống file HTML đơn. Bạn có thể mở xem ngay bằng trình duyệt!');
    } finally {
      setDangXuat(null);
    }
  };

  const xuLyTaiZip = async () => {
    setDangXuat('zip');
    setThongBaoXuat(null);
    try {
      await xuatFileZip(duLieu, theme);
      setThongBaoXuat('Đã tải xuống gói ZIP (gồm index.html và thư mục ảnh riêng).');
    } finally {
      setDangXuat(null);
    }
  };

  const xuLyDayGitHub = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoiGithub(null);
    setKetQuaGithub(null);
    setDangXuat('github');
    try {
      const ketQua = await dayLenGitHubPages({
        token: tokenGithub,
        tenKho: tenKhoGithub,
        duLieu,
        theme,
      });
      setKetQuaGithub(ketQua);
    } catch (err) {
      setLoiGithub(err instanceof Error ? err.message : 'Không đẩy được lên GitHub Pages.');
    } finally {
      setDangXuat(null);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-neutral-200 pb-5">
        <div>
          <button
            type="button"
            onClick={onQuayLaiBuoc3}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-neutral-600 hover:text-neutral-900 mb-2 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Chọn lại mẫu giao diện khác</span>
          </button>
          <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900">
            Chỉnh nhẹ &amp; Xuất trang web
          </h1>
          <p className="mt-1 text-sm text-neutral-600">
            Đang dùng mẫu <strong className="text-neutral-900">{theme.ten}</strong>. Tinh chỉnh
            màu chủ đạo, sắp xếp các khối rồi tải trang về máy.
          </p>
        </div>

        <div className="flex items-center gap-1 rounded-xl border border-neutral-200 bg-white p-1 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setCheDoXem('dienThoai')}
            className={`inline-flex items-center gap-1.5 min-h-[38px] rounded-lg px-3 py-1.5 text-xs font-semibold cursor-pointer ${
              cheDoXem === 'dienThoai'
                ? 'bg-neutral-900 text-white'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            <Smartphone className="w-4 h-4" />
            <span>Điện thoại</span>
          </button>
          <button
            type="button"
            onClick={() => setCheDoXem('mayTinh')}
            className={`inline-flex items-center gap-1.5 min-h-[38px] rounded-lg px-3 py-1.5 text-xs font-semibold cursor-pointer ${
              cheDoXem === 'mayTinh'
                ? 'bg-neutral-900 text-white'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            <Monitor className="w-4 h-4" />
            <span>Máy tính</span>
          </button>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Cột trái: Tùy chỉnh nhẹ & Tải xuống */}
        <div className="lg:col-span-5 space-y-6">
          {/* 1. Xuất trang hoàn chỉnh */}
          <section className="rounded-2xl border border-neutral-200 bg-white p-5 space-y-3">
            <h2 className="text-base font-bold text-neutral-900">Xuất bản trang cửa hàng</h2>
            <p className="text-xs text-neutral-600">
              File HTML đơn có thể gửi qua Zalo hoặc mở thẳng không cần mạng. Gói ZIP dành cho bạn đưa lên hosting.
            </p>

            <div className="grid grid-cols-1 gap-2.5 pt-1">
              <button
                type="button"
                disabled={dangXuat !== null}
                onClick={xuLyTaiHtml}
                className="inline-flex items-center justify-center gap-2 min-h-[48px] rounded-xl bg-emerald-700 px-4 py-3 text-sm font-semibold text-white hover:bg-emerald-800 disabled:opacity-60 transition-colors cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>
                  {dangXuat === 'html' ? 'Đang đóng gói HTML...' : 'Tải file HTML đơn (.html)'}
                </span>
              </button>

              <div className="grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  disabled={dangXuat !== null}
                  onClick={xuLyTaiZip}
                  className="inline-flex items-center justify-center gap-1.5 min-h-[44px] rounded-xl border border-neutral-300 bg-white px-3 py-2 text-xs sm:text-sm font-semibold text-neutral-800 hover:bg-neutral-50 cursor-pointer"
                >
                  <FileArchive className="w-4 h-4 text-emerald-700" />
                  <span>{dangXuat === 'zip' ? 'Đang nén...' : 'Tải gói ZIP'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => luuDuAnJson(duLieu)}
                  className="inline-flex items-center justify-center gap-1.5 min-h-[44px] rounded-xl border border-neutral-300 bg-white px-3 py-2 text-xs sm:text-sm font-semibold text-neutral-800 hover:bg-neutral-50 cursor-pointer"
                >
                  <FileJson className="w-4 h-4 text-amber-700" />
                  <span>Lưu dự án (.json)</span>
                </button>
              </div>
            </div>

            {thongBaoXuat && (
              <div className="flex items-start gap-2 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-xs font-medium text-emerald-900">
                <Check className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <span>{thongBaoXuat}</span>
              </div>
            )}

            {/* Đẩy lên GitHub Pages */}
            <div className="pt-2 border-t border-neutral-100">
              <button
                type="button"
                onClick={() => setMoGitHub((v) => !v)}
                className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-700 hover:text-emerald-800 cursor-pointer"
              >
                <Globe className="w-4 h-4" />
                <span>
                  {moGitHub ? 'Ẩn đẩy lên GitHub Pages' : 'Đưa thẳng lên web miễn phí (GitHub Pages)'}
                </span>
              </button>

              {moGitHub && (
                <form onSubmit={xuLyDayGitHub} className="mt-3 space-y-3 rounded-xl bg-neutral-50 p-3.5 border border-neutral-200">
                  <p className="text-xs text-neutral-600 leading-relaxed">
                    Nhập GitHub Personal Access Token (có quyền <code className="font-mono">repo</code>). Token chạy trực tiếp trên trình duyệt của bạn, không gửi về máy chủ trung gian.
                  </p>
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">
                      GitHub Token
                    </label>
                    <input
                      type="password"
                      value={tokenGithub}
                      onChange={(e) => setTokenGithub(e.target.value)}
                      placeholder="ghp_..."
                      className="w-full min-h-[40px] rounded-lg border border-neutral-300 bg-white px-3 py-1.5 text-xs font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">
                      Tên kho lưu trữ (tiếng Việt không dấu)
                    </label>
                    <input
                      type="text"
                      value={tenKhoGithub}
                      onChange={(e) => setTenKhoGithub(e.target.value)}
                      placeholder="cua-hang-cua-toi"
                      className="w-full min-h-[40px] rounded-lg border border-neutral-300 bg-white px-3 py-1.5 text-xs font-mono"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={dangXuat === 'github'}
                    className="w-full min-h-[42px] rounded-lg bg-neutral-900 px-4 py-2 text-xs font-semibold text-white hover:bg-neutral-800 disabled:opacity-60 cursor-pointer"
                  >
                    {dangXuat === 'github' ? 'Đang tạo kho & đẩy trang...' : 'Xuất bản lên GitHub Pages'}
                  </button>

                  {loiGithub && (
                    <p className="text-xs font-medium text-red-600">{loiGithub}</p>
                  )}

                  {ketQuaGithub && (
                    <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-xs space-y-1">
                      <p className="font-semibold text-emerald-900">
                        Đã đẩy file lên GitHub thành công! (Pages mất khoảng 1–2 phút để kích hoạt)
                      </p>
                      <a
                        href={ketQuaGithub.urlTrang}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 font-semibold text-emerald-800 underline break-all"
                      >
                        <span>{ketQuaGithub.urlTrang}</span>
                        <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                      </a>
                    </div>
                  )}
                </form>
              )}
            </div>
          </section>

          {/* 2. Đổi màu chính & QR Zalo & Ảnh bìa */}
          <section className="rounded-2xl border border-neutral-200 bg-white p-5 space-y-5">
            <div>
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-sm font-bold text-neutral-900 flex items-center gap-1.5">
                  <Palette className="w-4 h-4 text-emerald-700" />
                  <span>Màu sắc chủ đạo</span>
                </h2>
                {duLieu.giaoDien.mauChinh && (
                  <button
                    type="button"
                    onClick={() =>
                      onCapNhat((cu) => ({
                        ...cu,
                        giaoDien: { ...cu.giaoDien, mauChinh: null },
                      }))
                    }
                    className="text-xs font-medium text-neutral-600 hover:text-neutral-900 underline cursor-pointer"
                  >
                    Khôi phục màu gốc
                  </button>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                {theme.mauGoiY.map((mau) => {
                  const dangDung = mauDangDung.toLowerCase() === mau.toLowerCase();
                  return (
                    <button
                      key={mau}
                      type="button"
                      onClick={() =>
                        onCapNhat((cu) => ({
                          ...cu,
                          giaoDien: { ...cu.giaoDien, mauChinh: mau },
                        }))
                      }
                      className={`h-9 w-9 rounded-lg border cursor-pointer transition-transform ${
                        dangDung
                          ? 'ring-2 ring-offset-2 ring-neutral-900 scale-105 border-white'
                          : 'border-neutral-300'
                      }`}
                      style={{ backgroundColor: mau }}
                      aria-label={`Chọn màu ${mau}`}
                    />
                  );
                })}
                <label className="inline-flex items-center gap-1.5 min-h-[36px] rounded-lg border border-neutral-300 px-2.5 py-1 text-xs font-medium text-neutral-700 cursor-pointer">
                  <input
                    type="color"
                    value={mauDangDung}
                    onChange={(e) =>
                      onCapNhat((cu) => ({
                        ...cu,
                        giaoDien: { ...cu.giaoDien, mauChinh: e.target.value },
                      }))
                    }
                    className="h-5 w-5 border-0 bg-transparent p-0 cursor-pointer"
                  />
                  <span>Tự chọn</span>
                </label>
              </div>
            </div>

            {/* Bật tắt mã QR Zalo */}
            <div className="flex items-center justify-between gap-3 border-t border-neutral-100 pt-4">
              <div>
                <div className="text-sm font-semibold text-neutral-900">Hiện mã QR Zalo</div>
                <div className="text-xs text-neutral-500">
                  Khách mở máy ảnh quét là nhắn Zalo ngay
                </div>
              </div>
              <input
                type="checkbox"
                checked={duLieu.giaoDien.hienMaQrZalo}
                onChange={(e) =>
                  onCapNhat((cu) => ({
                    ...cu,
                    giaoDien: { ...cu.giaoDien, hienMaQrZalo: e.target.checked },
                  }))
                }
                className="h-5 w-5 accent-emerald-700 cursor-pointer"
              />
            </div>

            {/* Đổi nhanh ảnh banner */}
            <div className="border-t border-neutral-100 pt-4">
              <div className="text-sm font-semibold text-neutral-900 mb-2">Đổi nhanh ảnh bìa</div>
              <div className="flex items-center gap-2">
                <label className="flex-1 inline-flex items-center justify-center gap-1.5 min-h-[40px] rounded-lg border border-neutral-300 px-3 py-1.5 text-xs font-semibold text-neutral-800 hover:bg-neutral-50 cursor-pointer">
                  <ImagePlus className="w-4 h-4 text-emerald-700" />
                  <span>{duLieu.anhBanner ? 'Thay ảnh bìa khác' : 'Thêm ảnh bìa'}</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => xuLyDoiBannerNhanh(e.target.files?.[0])}
                  />
                </label>
                {duLieu.anhBanner && (
                  <button
                    type="button"
                    onClick={() => onCapNhat((cu) => ({ ...cu, anhBanner: null }))}
                    className="min-h-[40px] rounded-lg px-3 text-xs font-medium text-red-600 hover:bg-red-50 cursor-pointer"
                  >
                    Bỏ ảnh
                  </button>
                )}
              </div>
            </div>
          </section>

          {/* 3. Bật/tắt và sắp xếp thứ tự khối */}
          <section className="rounded-2xl border border-neutral-200 bg-white p-5">
            <h2 className="text-sm font-bold text-neutral-900">Bật / Tắt &amp; Sắp xếp các khối</h2>
            <p className="mt-1 text-xs text-neutral-500">
              Ẩn bớt phần không cần thiết hoặc đưa bảng giá lên ngay đầu trang.
            </p>

            <div className="mt-3 divide-y divide-neutral-100">
              {danhSachKhoiSapXep.map((maKhoi) => {
                const dangBat = duLieu.giaoDien.cacKhoiHienThi.includes(maKhoi);
                const viTri = duLieu.giaoDien.cacKhoiHienThi.indexOf(maKhoi);
                const thongTin = TEN_KHOI_HIEN_THI[maKhoi];

                return (
                  <div key={maKhoi} className="flex items-center justify-between gap-2 py-2.5">
                    <div className="min-w-0">
                      <div
                        className={`text-sm font-semibold truncate ${
                          dangBat ? 'text-neutral-900' : 'text-neutral-400 line-through'
                        }`}
                      >
                        {thongTin.ten}
                      </div>
                      <div className="text-xs text-neutral-500 truncate">{thongTin.moTa}</div>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      {dangBat && (
                        <>
                          <button
                            type="button"
                            disabled={viTri === 0}
                            onClick={() => doiThuTuKhoi(maKhoi, -1)}
                            className="min-h-[36px] min-w-[36px] flex items-center justify-center rounded-lg border border-neutral-200 text-neutral-600 disabled:opacity-30 hover:bg-neutral-50 cursor-pointer"
                            aria-label="Đưa khối lên"
                          >
                            <ArrowUp className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            disabled={viTri === duLieu.giaoDien.cacKhoiHienThi.length - 1}
                            onClick={() => doiThuTuKhoi(maKhoi, 1)}
                            className="min-h-[36px] min-w-[36px] flex items-center justify-center rounded-lg border border-neutral-200 text-neutral-600 disabled:opacity-30 hover:bg-neutral-50 cursor-pointer"
                            aria-label="Đưa khối xuống"
                          >
                            <ArrowDown className="w-3.5 h-3.5" />
                          </button>
                        </>
                      )}

                      <button
                        type="button"
                        onClick={() => batTatKhoi(maKhoi)}
                        className={`min-h-[36px] min-w-[36px] flex items-center justify-center rounded-lg border cursor-pointer ${
                          dangBat
                            ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                            : 'border-neutral-200 bg-neutral-100 text-neutral-500'
                        }`}
                        aria-label={dangBat ? 'Ẩn khối này' : 'Hiện khối này'}
                      >
                        {dangBat ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </div>

        {/* Cột phải: Xem trước trực tiếp */}
        <div className="lg:col-span-7 sticky top-20">
          <KhungXemTruocTheme
            duLieu={duLieu}
            theme={theme}
            maQrSvg={maQrSvg}
            cheDo={cheDoXem}
            chieuCao={720}
          />
        </div>
      </div>
    </div>
  );
};
