import React, { useMemo, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Eye,
  Monitor,
  Smartphone,
  X,
} from 'lucide-react';
import { sapXepThemeTheoNganh } from '../giaoDien/danhSachGiaoDien';
import { DuLieuCuaHang, ThemeGiaoDien } from '../kieuDuLieu';
import { KhungXemTruocTheme } from './KhungXemTruocTheme';

interface Buoc3XemTruocThemeProps {
  duLieu: DuLieuCuaHang;
  maQrSvg: string;
  onChonTheme: (maTheme: string) => void;
  onQuayLaiBuoc2: () => void;
  onSangBuoc4: () => void;
}

type BoLocTheme = 'tatCa' | 'hopNganh' | 'webflow' | 'truyenThong';

export const Buoc3XemTruocTheme: React.FC<Buoc3XemTruocThemeProps> = ({
  duLieu,
  maQrSvg,
  onChonTheme,
  onQuayLaiBuoc2,
  onSangBuoc4,
}) => {
  const danhSachSapXep = useMemo(
    () => sapXepThemeTheoNganh(duLieu.nganh),
    [duLieu.nganh]
  );
  const [boLoc, setBoLoc] = useState<BoLocTheme>('tatCa');
  const [themeXemTo, setThemeXemTo] = useState<ThemeGiaoDien | null>(null);
  const [cheDoKhungHinh, setCheDoKhungHinh] = useState<'dienThoai' | 'mayTinh'>('dienThoai');

  const danhSachLoc = useMemo(() => {
    if (boLoc === 'hopNganh') {
      return danhSachSapXep.filter((t) => t.nganhPhuHop.includes(duLieu.nganh));
    }
    if (boLoc === 'webflow') {
      return danhSachSapXep.filter((t) => t.phongCach.includes('Webflow'));
    }
    if (boLoc === 'truyenThong') {
      return danhSachSapXep.filter((t) => !t.phongCach.includes('Webflow'));
    }
    return danhSachSapXep;
  }, [boLoc, danhSachSapXep, duLieu.nganh]);

  const chiSoXemTo = themeXemTo
    ? danhSachLoc.findIndex((t) => t.ma === themeXemTo.ma)
    : -1;

  const chuyenThemeTrongModal = (buocNhay: -1 | 1) => {
    if (chiSoXemTo < 0 || !danhSachLoc.length) return;
    const moi =
      (chiSoXemTo + buocNhay + danhSachLoc.length) % danhSachLoc.length;
    setThemeXemTo(danhSachLoc[moi]);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
      {/* Phần đầu */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-neutral-200 pb-5">
        <div>
          <button
            type="button"
            onClick={onQuayLaiBuoc2}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-neutral-600 hover:text-neutral-900 mb-2 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Sửa lại thông tin</span>
          </button>
          <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900">
            Xem trước &amp; Chọn 1 trong 10 giao diện
          </h1>
          <p className="mt-1 text-sm text-neutral-600">
            Tất cả mẫu đều hiển thị bằng chính dữ liệu của{' '}
            <strong className="text-neutral-900">{duLieu.tenCuaHang || 'bạn'}</strong>. Bấm vào
            từng mẫu để phóng to trên Điện thoại (360px) hoặc Máy tính (1280px).
          </p>
        </div>

        <button
          type="button"
          onClick={onSangBuoc4}
          className="inline-flex items-center justify-center gap-2 min-h-[46px] rounded-xl bg-emerald-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-800 transition-colors shrink-0 cursor-pointer"
        >
          <span>Chỉnh nhẹ &amp; Xuất trang</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Bộ lọc phân nhóm 10 theme */}
      <div className="mt-5 flex flex-wrap items-center gap-1.5 rounded-xl bg-neutral-100 p-1.5 w-full sm:w-fit">
        {(
          [
            { ma: 'tatCa', nhan: `Tất cả (${danhSachSapXep.length})` },
            {
              ma: 'hopNganh',
              nhan: `Hợp ngành (${danhSachSapXep.filter((t) => t.nganhPhuHop.includes(duLieu.nganh)).length})`,
            },
            { ma: 'webflow', nhan: 'Phong cách Webflow' },
            { ma: 'truyenThong', nhan: 'Thuần Việt & Cổ điển' },
          ] as Array<{ ma: BoLocTheme; nhan: string }>
        ).map((tab) => (
          <button
            key={tab.ma}
            type="button"
            onClick={() => setBoLoc(tab.ma)}
            className={`min-h-[38px] rounded-lg px-3 py-1.5 text-xs sm:text-sm font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              boLoc === tab.ma
                ? 'bg-white text-neutral-900 shadow-xs font-semibold'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            {tab.nhan}
          </button>
        ))}
      </div>

      {/* Lưới thu nhỏ toàn bộ theme */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {danhSachLoc.map((theme) => {
          const hopNganh = theme.nganhPhuHop.includes(duLieu.nganh);
          const dangChon = duLieu.giaoDien.maTheme === theme.ma;

          return (
            <div
              key={theme.ma}
              className={`group flex flex-col rounded-2xl border bg-white overflow-hidden transition-all ${
                dangChon
                  ? 'border-emerald-700 ring-2 ring-emerald-700/20'
                  : 'border-neutral-200 hover:border-neutral-400'
              }`}
            >
              {/* Khung xem trước thu nhỏ */}
              <div className="relative border-b border-neutral-200 bg-neutral-100">
                <KhungXemTruocTheme
                  duLieu={{
                    ...duLieu,
                    giaoDien: { ...duLieu.giaoDien, maTheme: theme.ma, mauChinh: null },
                  }}
                  theme={theme}
                  maQrSvg={maQrSvg}
                  cheDo="thuNho"
                  chieuCao={300}
                />
                <button
                  type="button"
                  onClick={() => setThemeXemTo(theme)}
                  className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/25 transition-colors cursor-pointer"
                  aria-label={`Xem phóng to giao diện ${theme.ten}`}
                >
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-xs font-semibold text-neutral-900 shadow-md">
                    <Eye className="w-4 h-4 text-emerald-700" />
                    <span>Bấm để xem to</span>
                  </span>
                </button>
              </div>

              {/* Thông tin theme — văn bản gọn gàng không lạm dụng pill */}
              <div className="p-4 flex flex-col flex-1 justify-between gap-4">
                <div>
                  <div className="flex items-center justify-between gap-2 text-xs text-neutral-500">
                    <span className="truncate">{theme.phongCach}</span>
                    {hopNganh && (
                      <span className="font-semibold text-emerald-800 whitespace-nowrap shrink-0">
                        Hợp ngành của bạn
                      </span>
                    )}
                  </div>
                  <h2 className="mt-1 text-base font-bold text-neutral-900">{theme.ten}</h2>
                  <p className="mt-1 text-xs sm:text-sm text-neutral-600 leading-snug">
                    {theme.moTaNgan}
                  </p>
                </div>

                <div className="flex items-center gap-2 pt-2 border-t border-neutral-100">
                  <button
                    type="button"
                    onClick={() => setThemeXemTo(theme)}
                    className="min-h-[42px] rounded-xl border border-neutral-300 bg-white px-3.5 py-2 text-xs font-semibold text-neutral-800 hover:bg-neutral-50 cursor-pointer whitespace-nowrap"
                  >
                    Xem to
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      onChonTheme(theme.ma);
                      onSangBuoc4();
                    }}
                    className={`flex-1 inline-flex items-center justify-center gap-1.5 min-h-[42px] rounded-xl px-4 py-2 text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                      dangChon
                        ? 'bg-emerald-700 text-white'
                        : 'bg-neutral-900 text-white hover:bg-neutral-800'
                    }`}
                  >
                    {dangChon && <Check className="w-4 h-4" />}
                    <span>{dangChon ? 'Đang chọn · Tiếp tục' : 'Chọn mẫu này'}</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal Xem To (chuyển Điện thoại 360px / Máy tính 1280px & đổi theme Trước/Sau) */}
      {themeXemTo && (
        <div
          className="fixed inset-0 z-50 flex flex-col bg-neutral-900/80 backdrop-blur-xs"
          role="dialog"
          aria-modal="true"
          aria-label={`Xem toàn trang ${themeXemTo.ten}`}
        >
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-800 bg-neutral-950 px-4 py-3 text-white">
            <div className="flex items-center gap-2 min-w-0">
              <button
                type="button"
                onClick={() => chuyenThemeTrongModal(-1)}
                className="min-h-[40px] min-w-[40px] flex items-center justify-center rounded-lg border border-neutral-700 hover:bg-neutral-800 cursor-pointer"
                aria-label="Theme trước"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div className="min-w-0 px-1">
                <div className="text-sm font-bold truncate">
                  {themeXemTo.ten} ({chiSoXemTo + 1}/{danhSachLoc.length})
                </div>
                <div className="text-xs text-neutral-400 truncate">
                  {themeXemTo.phongCach}
                </div>
              </div>
              <button
                type="button"
                onClick={() => chuyenThemeTrongModal(1)}
                className="min-h-[40px] min-w-[40px] flex items-center justify-center rounded-lg border border-neutral-700 hover:bg-neutral-800 cursor-pointer"
                aria-label="Theme tiếp theo"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            <div className="flex items-center gap-1 rounded-lg bg-neutral-900 p-1 border border-neutral-800">
              <button
                type="button"
                onClick={() => setCheDoKhungHinh('dienThoai')}
                className={`inline-flex items-center gap-1.5 min-h-[36px] rounded-md px-3 py-1 text-xs font-medium cursor-pointer ${
                  cheDoKhungHinh === 'dienThoai'
                    ? 'bg-white text-neutral-900'
                    : 'text-neutral-300 hover:text-white'
                }`}
              >
                <Smartphone className="w-4 h-4" />
                <span>Điện thoại</span>
              </button>
              <button
                type="button"
                onClick={() => setCheDoKhungHinh('mayTinh')}
                className={`inline-flex items-center gap-1.5 min-h-[36px] rounded-md px-3 py-1 text-xs font-medium cursor-pointer ${
                  cheDoKhungHinh === 'mayTinh'
                    ? 'bg-white text-neutral-900'
                    : 'text-neutral-300 hover:text-white'
                }`}
              >
                <Monitor className="w-4 h-4" />
                <span>Máy tính</span>
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  onChonTheme(themeXemTo.ma);
                  setThemeXemTo(null);
                  onSangBuoc4();
                }}
                className="min-h-[40px] rounded-lg bg-emerald-600 px-4 py-2 text-xs sm:text-sm font-semibold text-white hover:bg-emerald-500 cursor-pointer whitespace-nowrap"
              >
                Chọn mẫu này &amp; Xuất
              </button>
              <button
                type="button"
                onClick={() => setThemeXemTo(null)}
                className="min-h-[40px] min-w-[40px] flex items-center justify-center rounded-lg border border-neutral-700 text-neutral-300 hover:bg-neutral-800 cursor-pointer"
                aria-label="Đóng xem trước"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 sm:p-6">
            <div className="mx-auto max-w-6xl">
              <KhungXemTruocTheme
                duLieu={{
                  ...duLieu,
                  giaoDien: { ...duLieu.giaoDien, maTheme: themeXemTo.ma, mauChinh: null },
                }}
                theme={themeXemTo}
                maQrSvg={maQrSvg}
                cheDo={cheDoKhungHinh}
                chieuCao={680}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
