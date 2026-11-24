import React from 'react';
import { FolderOpen } from 'lucide-react';

interface ThanhDieuHuongTrenProps {
  buocHienTai: number;
  onChuyenBuoc: (buoc: number) => void;
  onMoTienIch: () => void;
  daCoDuLieuCoBan: boolean;
}

const DANH_SACH_BUOC = [
  { so: 1, nhan: '1. Chọn ngành' },
  { so: 2, nhan: '2. Nhập thông tin' },
  { so: 3, nhan: '3. Chọn giao diện' },
  { so: 4, nhan: '4. Chỉnh & Xuất' },
];

// Thanh điều hướng 3 vùng gọn gàng: Tên ứng dụng — 4 liên kết bước — 1 nút tiện ích dự án
export const ThanhDieuHuongTren: React.FC<ThanhDieuHuongTrenProps> = ({
  buocHienTai,
  onChuyenBuoc,
  onMoTienIch,
  daCoDuLieuCoBan,
}) => {
  return (
    <header className="sticky top-0 z-30 border-b border-neutral-200 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-8 px-4 py-3 sm:px-6">
        <button
          type="button"
          onClick={() => onChuyenBuoc(1)}
          className="text-left text-base font-bold tracking-tight text-neutral-900 whitespace-nowrap shrink-0 hover:text-emerald-800 transition-colors cursor-pointer"
        >
          Tạo Trang Cửa Hàng Việt
        </button>

        <nav
          aria-label="Các bước tạo trang"
          className="hidden md:flex items-center gap-6 text-sm font-medium"
        >
          {DANH_SACH_BUOC.map((b) => {
            const dangChon = buocHienTai === b.so;
            const biKhoa = (b.so === 3 || b.so === 4) && !daCoDuLieuCoBan;
            return (
              <button
                key={b.so}
                type="button"
                onClick={() => onChuyenBuoc(b.so)}
                className={`whitespace-nowrap shrink-0 py-1 border-b-2 transition-colors cursor-pointer ${
                  dangChon
                    ? 'border-emerald-700 text-emerald-800 font-semibold'
                    : biKhoa
                      ? 'border-transparent text-neutral-400 hover:text-neutral-600'
                      : 'border-transparent text-neutral-600 hover:text-neutral-900 hover:border-neutral-300'
                }`}
              >
                {b.nhan}
              </button>
            );
          })}
        </nav>

        <div className="flex items-center shrink-0">
          <button
            type="button"
            onClick={onMoTienIch}
            className="inline-flex items-center gap-2 min-h-[40px] rounded-lg border border-neutral-300 bg-white px-3.5 py-2 text-xs sm:text-sm font-medium text-neutral-800 hover:bg-neutral-50 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <FolderOpen className="w-4 h-4 text-emerald-700" />
            <span>Mẫu thử &amp; Dự án</span>
          </button>
        </div>
      </div>

      {/* Thanh chuyển bước gọn cho màn hình điện thoại */}
      <div className="flex md:hidden items-center justify-between border-t border-neutral-100 px-3 py-1.5 overflow-x-auto gap-2">
        {DANH_SACH_BUOC.map((b) => {
          const dangChon = buocHienTai === b.so;
          return (
            <button
              key={b.so}
              type="button"
              onClick={() => onChuyenBuoc(b.so)}
              className={`min-h-[36px] px-2.5 py-1 text-xs font-medium rounded-md whitespace-nowrap shrink-0 cursor-pointer ${
                dangChon
                  ? 'bg-emerald-50 text-emerald-800 font-semibold'
                  : 'text-neutral-600'
              }`}
            >
              {b.nhan}
            </button>
          );
        })}
      </div>
    </header>
  );
};
