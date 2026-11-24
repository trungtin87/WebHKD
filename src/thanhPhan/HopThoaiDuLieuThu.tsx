import React, { useRef, useState } from 'react';
import { Download, FileUp, RotateCcw, ShieldAlert, X } from 'lucide-react';
import { BO_DU_LIEU_THU } from '../duLieu/boDuLieuThu';
import { DuLieuCuaHang } from '../kieuDuLieu';
import { docDuAnJson, luuDuAnJson } from '../tienIch/xuatBanTrang';

interface HopThoaiDuLieuThuProps {
  mo: boolean;
  duLieuHienTai: DuLieuCuaHang;
  onDong: () => void;
  onNapDuLieu: (duLieuMoi: DuLieuCuaHang, chuyenDenBuoc?: number) => void;
  onBatDauLai: () => void;
}

// Hộp thoại nạp 5 bộ dữ liệu thử, lưu/mở file dự án .json và làm mới bản nháp
export const HopThoaiDuLieuThu: React.FC<HopThoaiDuLieuThuProps> = ({
  mo,
  duLieuHienTai,
  onDong,
  onNapDuLieu,
  onBatDauLai,
}) => {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [thongBaoLoi, setThongBaoLoi] = useState<string | null>(null);
  const [dangXacNhanXoa, setDangXacNhanXoa] = useState(false);

  if (!mo) return null;

  const xuLyMoFileJson = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setThongBaoLoi(null);
    try {
      const duLieuMoi = await docDuAnJson(file);
      onNapDuLieu(duLieuMoi, 2);
      onDong();
    } catch (err) {
      setThongBaoLoi(err instanceof Error ? err.message : 'Không đọc được file.');
    } finally {
      e.target.value = '';
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-xs p-0 sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="tieu-de-hop-thoai-du-an"
    >
      <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-t-2xl sm:rounded-2xl bg-white border border-neutral-200 shadow-xl">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-neutral-200 bg-white px-5 py-4">
          <h2 id="tieu-de-hop-thoai-du-an" className="text-lg font-bold text-neutral-900">
            Quản lý dự án &amp; Bộ dữ liệu thử
          </h2>
          <button
            type="button"
            onClick={onDong}
            className="min-h-[40px] min-w-[40px] flex items-center justify-center rounded-lg text-neutral-500 hover:bg-neutral-100 cursor-pointer"
            aria-label="Đóng hộp thoại"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 space-y-6">
          {/* Thông báo lưu trữ trình duyệt */}
          <div className="flex gap-3 rounded-xl border border-amber-200 bg-amber-50/70 p-4 text-sm text-amber-950">
            <ShieldAlert className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold">Dữ liệu được lưu ngay trên thiết bị của bạn</p>
              <p className="mt-1 text-amber-900/90">
                Ứng dụng tự động lưu nháp trong trình duyệt. Nếu xóa lịch sử trình duyệt, dữ liệu sẽ
                mất — bạn nên tải file dự án (.json) về máy để dự phòng hoặc chỉnh sửa lại sau.
              </p>
            </div>
          </div>

          {/* Lưu / Mở dự án .json */}
          <div>
            <h3 className="text-sm font-semibold text-neutral-900 mb-3">
              Sao lưu &amp; Mở lại dự án (.json)
            </h3>
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => luuDuAnJson(duLieuHienTai)}
                className="inline-flex items-center gap-2 min-h-[44px] rounded-xl bg-emerald-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-800 transition-colors cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Tải dự án (.json)</span>
              </button>

              <button
                type="button"
                onClick={() => inputFileRef.current?.click()}
                className="inline-flex items-center gap-2 min-h-[44px] rounded-xl border border-neutral-300 bg-white px-4 py-2.5 text-sm font-semibold text-neutral-800 hover:bg-neutral-50 transition-colors cursor-pointer"
              >
                <FileUp className="w-4 h-4" />
                <span>Mở file dự án (.json)</span>
              </button>
              <input
                ref={inputFileRef}
                type="file"
                accept=".json,application/json"
                className="hidden"
                onChange={xuLyMoFileJson}
              />
            </div>
            {thongBaoLoi && (
              <p className="mt-2 text-sm text-red-600 font-medium">{thongBaoLoi}</p>
            )}
          </div>

          {/* 5 bộ dữ liệu thử bắt buộc */}
          <div className="border-t border-neutral-200 pt-5">
            <h3 className="text-sm font-semibold text-neutral-900 mb-1">
              Nạp nhanh 5 bộ dữ liệu mẫu để kiểm thử giao diện
            </h3>
            <p className="text-xs text-neutral-500 mb-3">
              Dùng để xem trước ngay các tình huống thực tế (đầy đủ ảnh, tối thiểu, chữ rất dài, 12 sản phẩm, không có ảnh).
            </p>
            <div className="space-y-2.5">
              {BO_DU_LIEU_THU.map((bo) => (
                <div
                  key={bo.ma}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border border-neutral-200 p-3.5 hover:border-emerald-300 transition-colors"
                >
                  <div className="min-w-0">
                    <div className="text-sm font-semibold text-neutral-900">{bo.ten}</div>
                    <div className="text-xs text-neutral-600 mt-0.5">{bo.moTa}</div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => {
                        onNapDuLieu(bo.duLieu, 3);
                        onDong();
                      }}
                      className="min-h-[40px] rounded-lg bg-neutral-900 px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-neutral-800 cursor-pointer whitespace-nowrap"
                    >
                      Xem các theme
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        onNapDuLieu(bo.duLieu, 2);
                        onDong();
                      }}
                      className="min-h-[40px] rounded-lg border border-neutral-300 px-3 py-1.5 text-xs font-medium text-neutral-700 hover:bg-neutral-50 cursor-pointer whitespace-nowrap"
                    >
                      Sửa form
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bắt đầu lại */}
          <div className="border-t border-neutral-200 pt-5">
            {!dangXacNhanXoa ? (
              <button
                type="button"
                onClick={() => setDangXacNhanXoa(true)}
                className="inline-flex items-center gap-2 min-h-[42px] rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-700 hover:bg-red-100 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Xóa nháp &amp; Bắt đầu lại từ đầu</span>
              </button>
            ) : (
              <div className="rounded-xl border border-red-200 bg-red-50 p-4">
                <p className="text-sm font-semibold text-red-900">
                  Bạn chắc chắn muốn xóa toàn bộ thông tin đang nhập?
                </p>
                <p className="text-xs text-red-700 mt-1">
                  Hành động này sẽ xóa bản nháp trên trình duyệt. Nếu cần giữ lại, hãy tải file .json trước.
                </p>
                <div className="mt-3 flex gap-2.5">
                  <button
                    type="button"
                    onClick={() => {
                      setDangXacNhanXoa(false);
                      onBatDauLai();
                      onDong();
                    }}
                    className="min-h-[40px] rounded-lg bg-red-600 px-4 py-2 text-xs font-semibold text-white hover:bg-red-700 cursor-pointer"
                  >
                    Xác nhận xóa &amp; làm mới
                  </button>
                  <button
                    type="button"
                    onClick={() => setDangXacNhanXoa(false)}
                    className="min-h-[40px] rounded-lg border border-neutral-300 bg-white px-4 py-2 text-xs font-medium text-neutral-700 hover:bg-neutral-50 cursor-pointer"
                  >
                    Giữ lại
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
