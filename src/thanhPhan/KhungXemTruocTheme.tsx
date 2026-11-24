import React, { useEffect, useMemo, useRef, useState } from 'react';
import { DuLieuCuaHang, ThemeGiaoDien } from '../kieuDuLieu';

interface KhungXemTruocThemeProps {
  duLieu: DuLieuCuaHang;
  theme: ThemeGiaoDien;
  maQrSvg: string;
  cheDo: 'thuNho' | 'dienThoai' | 'mayTinh';
  chieuCao?: number;
}

// Khung iframe cô lập hoàn toàn CSS của từng theme, chỉ dựng lại html khi dữ liệu hoặc theme đổi
export const KhungXemTruocTheme: React.FC<KhungXemTruocThemeProps> = ({
  duLieu,
  theme,
  maQrSvg,
  cheDo,
  chieuCao = 340,
}) => {
  const khungBaoRef = useRef<HTMLDivElement>(null);
  const [chieuRongBao, setChieuRongBao] = useState<number>(360);

  const htmlTrang = useMemo(() => {
    const mauChinh = duLieu.giaoDien.mauChinh || theme.bangMau.chinh;
    return theme.veTrang(duLieu, {
      maQrSvg,
      mauChinhTuyChon: mauChinh,
      cheDoXuat: 'xemTruoc',
    });
  }, [duLieu, theme, maQrSvg]);

  useEffect(() => {
    if (cheDo !== 'thuNho' || !khungBaoRef.current) return;
    const capNhatKichThuoc = () => {
      if (khungBaoRef.current) {
        setChieuRongBao(khungBaoRef.current.clientWidth || 320);
      }
    };
    capNhatKichThuoc();
    const quanSat = new ResizeObserver(capNhatKichThuoc);
    quanSat.observe(khungBaoRef.current);
    return () => quanSat.disconnect();
  }, [cheDo]);

  if (cheDo === 'thuNho') {
    const chieuRongAo = 1024;
    const tiLe = Math.max(0.2, Math.min(1, chieuRongBao / chieuRongAo));
    const chieuCaoAo = Math.round(chieuCao / tiLe);

    return (
      <div
        ref={khungBaoRef}
        className="relative w-full overflow-hidden bg-white select-none"
        style={{ height: `${chieuCao}px` }}
      >
        <iframe
          title={`Xem trước ${theme.ten}`}
          srcDoc={htmlTrang}
          sandbox="allow-same-origin"
          tabIndex={-1}
          className="pointer-events-none border-0 origin-top-left block"
          style={{
            width: `${chieuRongAo}px`,
            height: `${chieuCaoAo}px`,
            transform: `scale(${tiLe})`,
          }}
        />
      </div>
    );
  }

  if (cheDo === 'dienThoai') {
    return (
      <div className="mx-auto w-[360px] max-w-full border border-neutral-300 rounded-[28px] bg-neutral-900 p-2.5 shadow-sm">
        <div className="mx-auto mb-2 h-1.5 w-16 rounded-full bg-neutral-700" />
        <div className="overflow-hidden rounded-[20px] bg-white">
          <iframe
            title={`Xem trước điện thoại - ${theme.ten}`}
            srcDoc={htmlTrang}
            sandbox="allow-same-origin allow-popups"
            className="w-full border-0 block"
            style={{ height: `${chieuCao}px` }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full overflow-hidden rounded-xl border border-neutral-200 bg-white">
      <div className="flex items-center gap-2 border-b border-neutral-200 bg-neutral-50 px-3 py-2 text-xs text-neutral-500">
        <span className="font-mono truncate">
          {duLieu.tenCuaHang.trim() || 'trang-cua-hang'}.html
        </span>
      </div>
      <iframe
        title={`Xem trước máy tính - ${theme.ten}`}
        srcDoc={htmlTrang}
        sandbox="allow-same-origin allow-popups"
        className="w-full border-0 block"
        style={{ height: `${chieuCao}px` }}
      />
    </div>
  );
};
