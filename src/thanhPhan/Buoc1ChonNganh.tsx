import React, { useRef, useState } from 'react';
import {
  ArrowRight,
  Check,
  FileUp,
  Hammer,
  Package,
  Shirt,
  Sparkles,
  Sprout,
  Store,
  Utensils,
  Wrench,
} from 'lucide-react';
import { GOI_Y_THEO_NGANH } from '../duLieu/goiYTheoNganh';
import { DuLieuCuaHang, MaNganh } from '../kieuDuLieu';
import { docDuAnJson } from '../tienIch/xuatBanTrang';

interface Buoc1ChonNganhProps {
  nganhDangChon: MaNganh;
  onChonNganh: (nganh: MaNganh) => void;
  onSangBuoc2: () => void;
  onNapDuLieuJson: (duLieuMoi: DuLieuCuaHang) => void;
  onXemThuMauDayDu: () => void;
}

const BIEU_TUONG_NGANH: Record<MaNganh, React.ReactNode> = {
  amThuc: <Utensils className="w-5 h-5" />,
  nongSan: <Sprout className="w-5 h-5" />,
  thoiTrang: <Shirt className="w-5 h-5" />,
  myPham: <Sparkles className="w-5 h-5" />,
  dichVu: <Wrench className="w-5 h-5" />,
  thuCong: <Hammer className="w-5 h-5" />,
  khac: <Store className="w-5 h-5" />,
};

export const Buoc1ChonNganh: React.FC<Buoc1ChonNganhProps> = ({
  nganhDangChon,
  onChonNganh,
  onSangBuoc2,
  onNapDuLieuJson,
  onXemThuMauDayDu,
}) => {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [loiMoFile, setLoiMoFile] = useState<string | null>(null);

  const xuLyMoFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLoiMoFile(null);
    try {
      const duLieu = await docDuAnJson(file);
      onNapDuLieuJson(duLieu);
    } catch (err) {
      setLoiMoFile(err instanceof Error ? err.message : 'Không đọc được file dự án.');
    } finally {
      e.target.value = '';
    }
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
      {/* Phần giới thiệu mở đầu phù hợp hộ kinh doanh Việt Nam */}
      <div className="max-w-3xl">
        <p className="text-xs font-semibold tracking-wide text-emerald-800 uppercase">
          Bước 1 trên 4 · Thiết lập nhanh cho hộ kinh doanh
        </p>
        <h1 className="mt-2 text-2xl sm:text-4xl font-bold tracking-tight text-neutral-900">
          Tạo trang giới thiệu cửa hàng chuẩn phong cách Việt Nam
        </h1>
        <p className="mt-3 text-base text-neutral-600 leading-relaxed">
          Chỉ cần điền thông tin cơ bản một lần, sau đó xem trước nhiều mẫu giao diện thuần Việt
          và tải về dùng ngay. Trang tối ưu cho việc <strong>niêm yết giá tham khảo</strong>, hiển
          thị rõ <strong>người bán &amp; khu vực phục vụ</strong> và nhận khách trực tiếp qua{' '}
          <strong>Zalo, số điện thoại</strong>.
        </p>

        <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-neutral-600">
          <span>Không cần tài khoản</span>
          <span aria-hidden="true">·</span>
          <span>Không giỏ hàng thanh toán phức tạp</span>
          <span aria-hidden="true">·</span>
          <span>Tự tạo mã QR Zalo</span>
        </div>
      </div>

      {/* Lưới chọn 1 trong 7 ngành */}
      <div className="mt-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-4">
          <h2 className="text-lg font-bold text-neutral-900">
            Cửa hàng của bạn thuộc lĩnh vực nào?
          </h2>
          <p className="text-xs sm:text-sm text-neutral-500">
            Hệ thống sẽ điền sẵn khẩu hiệu và sản phẩm mẫu để bạn sửa nhanh
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {GOI_Y_THEO_NGANH.map((nganh) => {
            const dangChon = nganh.ma === nganhDangChon;
            return (
              <button
                key={nganh.ma}
                type="button"
                onClick={() => onChonNganh(nganh.ma)}
                className={`group text-left rounded-2xl border p-5 transition-all cursor-pointer flex flex-col justify-between min-h-[144px] ${
                  dangChon
                    ? 'border-emerald-700 bg-emerald-50/60 ring-1 ring-emerald-700'
                    : 'border-neutral-200 bg-white hover:border-neutral-400'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-3">
                    <span
                      className={`inline-flex h-10 w-10 items-center justify-center rounded-xl border ${
                        dangChon
                          ? 'border-emerald-200 bg-emerald-700 text-white'
                          : 'border-neutral-200 bg-neutral-50 text-neutral-700 group-hover:bg-neutral-100'
                      }`}
                    >
                      {BIEU_TUONG_NGANH[nganh.ma]}
                    </span>
                    {dangChon && (
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-800">
                        <Check className="w-4 h-4" />
                        Đang chọn
                      </span>
                    )}
                  </div>
                  <h3 className="mt-3.5 text-base font-bold text-neutral-900">{nganh.ten}</h3>
                  <p className="mt-1 text-sm text-neutral-600 leading-snug">{nganh.moTaNgan}</p>
                </div>
                <p className="mt-3 pt-2.5 border-t border-neutral-100 text-xs text-neutral-500 truncate">
                  Ví dụ: {nganh.viDuCuaHang}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Thanh hành động tiếp tục & tiện ích mở nhanh */}
      <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 rounded-2xl border border-neutral-200 bg-white p-5">
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => inputFileRef.current?.click()}
            className="inline-flex items-center gap-2 min-h-[44px] rounded-xl border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50 cursor-pointer"
          >
            <FileUp className="w-4 h-4" />
            <span>Mở lại dự án (.json)</span>
          </button>
          <input
            ref={inputFileRef}
            type="file"
            accept=".json,application/json"
            className="hidden"
            onChange={xuLyMoFile}
          />
          <button
            type="button"
            onClick={onXemThuMauDayDu}
            className="inline-flex items-center gap-2 min-h-[44px] rounded-xl border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50 cursor-pointer"
          >
            <Package className="w-4 h-4 text-emerald-700" />
            <span>Xem thử mẫu có sẵn</span>
          </button>
        </div>

        <button
          type="button"
          onClick={onSangBuoc2}
          className="inline-flex items-center justify-center gap-2 min-h-[48px] rounded-xl bg-emerald-700 px-6 py-3 text-sm sm:text-base font-semibold text-white hover:bg-emerald-800 transition-colors cursor-pointer"
        >
          <span>Tiếp tục nhập thông tin</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {loiMoFile && (
        <p className="mt-3 text-sm font-medium text-red-600">{loiMoFile}</p>
      )}
    </div>
  );
};
