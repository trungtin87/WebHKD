import { useEffect, useState } from 'react';
import {
  BO_DU_LIEU_THU,
  chuanHoaDuLieuNhap,
  taoDuLieuMacDinhTheoNganh,
} from './duLieu/boDuLieuThu';
import { layGoiYTheoNganh } from './duLieu/goiYTheoNganh';
import { DuLieuCuaHang, MaNganh } from './kieuDuLieu';
import { Buoc1ChonNganh } from './thanhPhan/Buoc1ChonNganh';
import { Buoc2NhapThongTin } from './thanhPhan/Buoc2NhapThongTin';
import { Buoc3XemTruocTheme } from './thanhPhan/Buoc3XemTruocTheme';
import { Buoc4ChinhVaXuat } from './thanhPhan/Buoc4ChinhVaXuat';
import { HopThoaiDuLieuThu } from './thanhPhan/HopThoaiDuLieuThu';
import { ThanhDieuHuongTren } from './thanhPhan/ThanhDieuHuongTren';
import {
  docBanNhap,
  docCaiDatUi,
  luuBanNhap,
  luuCaiDatUi,
  xoaBanNhap,
} from './tienIch/luuTruTrinhDuyet';
import { taoMaQrSvg } from './tienIch/xuLyAnh';
import { kiemTraFormBuoc2, taoLinkZalo } from './tienIch/xuLyDuLieu';

export default function App() {
  const [duLieu, setDuLieu] = useState<DuLieuCuaHang>(() =>
    taoDuLieuMacDinhTheoNganh('amThuc')
  );
  const [buocHienTai, setBuocHienTai] = useState<number>(1);
  const [maQrSvg, setMaQrSvg] = useState<string>('');
  const [moHopThoaiDuAn, setMoHopThoaiDuAn] = useState(false);

  // Hộp thoại hỏi "Tiếp tục bản đang làm dở?" khi mở lại trình duyệt
  const [banNhapCu, setBanNhapCu] = useState<{
    duLieu: DuLieuCuaHang;
    buoc: number;
  } | null>(null);
  const [daKiemTraBanNhap, setDaKiemTraBanNhap] = useState(false);
  const [thongBaoChuyenBuoc, setThongBaoChuyenBuoc] = useState<string | null>(null);

  // Đọc bản nháp từ IndexedDB lúc khởi động
  useEffect(() => {
    let conHieuLuc = true;
    (async () => {
      const banLuu = await docBanNhap();
      const caiDat = docCaiDatUi();
      if (!conHieuLuc) return;

      if (
        banLuu &&
        banLuu.duLieu &&
        (banLuu.duLieu.tenCuaHang.trim() ||
          banLuu.duLieu.soZalo.trim() ||
          banLuu.duLieu.diaChi.trim())
      ) {
        setBanNhapCu({
          duLieu: chuanHoaDuLieuNhap(banLuu.duLieu),
          buoc: caiDat?.buocHienTai || 2,
        });
      }
      setDaKiemTraBanNhap(true);
    })();
    return () => {
      conHieuLuc = false;
    };
  }, []);

  // Tự động lưu nháp sau 1 giây ngừng thao tác (chỉ lưu sau khi đã xử lý xong prompt khôi phục)
  useEffect(() => {
    if (!daKiemTraBanNhap || banNhapCu) return;
    const henGio = setTimeout(() => {
      luuBanNhap(duLieu);
      luuCaiDatUi({ buocHienTai, thoiGianLuuCuoi: Date.now() });
    }, 1000);
    return () => clearTimeout(henGio);
  }, [duLieu, buocHienTai, daKiemTraBanNhap, banNhapCu]);

  // Sinh mã QR Zalo dạng SVG mỗi khi số Zalo thay đổi
  useEffect(() => {
    let conHieuLuc = true;
    const link = taoLinkZalo(duLieu.soZalo);
    if (link === '#') {
      setMaQrSvg('');
      return;
    }
    taoMaQrSvg(link, '#111827').then((svg) => {
      if (conHieuLuc) setMaQrSvg(svg);
    });
    return () => {
      conHieuLuc = false;
    };
  }, [duLieu.soZalo]);

  const { hopLe: daCoDuLieuCoBan } = kiemTraFormBuoc2(duLieu);

  const xuLyChonNganh = (nganhMoi: MaNganh) => {
    const goiYCu = layGoiYTheoNganh(duLieu.nganh);
    const goiYMoi = layGoiYTheoNganh(nganhMoi);

    setDuLieu((cu) => {
      const macDinhMoi = taoDuLieuMacDinhTheoNganh(nganhMoi);
      // Chỉ ghi đè các trường gợi ý nếu người dùng chưa tự sửa nội dung khác gợi ý cũ
      const giuKhauHieu =
        cu.khauHieu.trim() !== '' && cu.khauHieu !== goiYCu.khauHieuMau;
      const giuGioiThieu =
        cu.gioiThieu.doanVan.trim() !== '' &&
        cu.gioiThieu.doanVan !== goiYCu.doanGioiThieuMau;
      const daSuaSanPham = cu.danhSachSanPham.some(
        (sp, i) => sp.ten !== (goiYCu.sanPhamMau[i]?.ten || '')
      );

      return {
        ...cu,
        nganh: nganhMoi,
        khauHieu: giuKhauHieu ? cu.khauHieu : macDinhMoi.khauHieu,
        gioMoCua: cu.gioMoCua.trim() ? cu.gioMoCua : macDinhMoi.gioMoCua,
        danhSachSanPham: daSuaSanPham ? cu.danhSachSanPham : macDinhMoi.danhSachSanPham,
        gioiThieu: giuGioiThieu ? cu.gioiThieu : macDinhMoi.gioiThieu,
        hoKinhDoanh: {
          ...cu.hoKinhDoanh,
          khuVucPhucVu:
            cu.hoKinhDoanh.khuVucPhucVu &&
            cu.hoKinhDoanh.khuVucPhucVu !== goiYCu.khuVucPhucVuMau
              ? cu.hoKinhDoanh.khuVucPhucVu
              : macDinhMoi.hoKinhDoanh.khuVucPhucVu,
        },
        giaoDien: {
          ...cu.giaoDien,
          maTheme: goiYMoi.themeGoiY,
        },
      };
    });
  };

  const xuLyChuyenBuoc = (buocDich: number) => {
    setThongBaoChuyenBuoc(null);
    if ((buocDich === 3 || buocDich === 4) && !daCoDuLieuCoBan) {
      setBuocHienTai(2);
      setThongBaoChuyenBuoc(
        'Vui lòng điền Tên cửa hàng, Số Zalo (10 số), Địa chỉ và ít nhất 1 sản phẩm trước khi xem giao diện.'
      );
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    setBuocHienTai(buocDich);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const xuLyBatDauLai = async () => {
    await xoaBanNhap();
    setDuLieu(taoDuLieuMacDinhTheoNganh('amThuc'));
    setBuocHienTai(1);
    setBanNhapCu(null);
    setThongBaoChuyenBuoc(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FA] text-neutral-900">
      <ThanhDieuHuongTren
        buocHienTai={buocHienTai}
        onChuyenBuoc={xuLyChuyenBuoc}
        onMoTienIch={() => setMoHopThoaiDuAn(true)}
        daCoDuLieuCoBan={daCoDuLieuCoBan}
      />

      {/* Biểu ngữ khôi phục bản đang làm dở */}
      {banNhapCu && (
        <div className="border-b border-emerald-200 bg-emerald-50 px-4 py-3 sm:px-6">
          <div className="mx-auto flex max-w-6xl flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="text-sm text-emerald-950">
              <span className="font-semibold">Tiếp tục bản đang làm dở?</span>{' '}
              <span className="text-emerald-800">
                Tìm thấy bản nháp của{' '}
                <strong>{banNhapCu.duLieu.tenCuaHang || 'cửa hàng trước đó'}</strong> đã lưu trên
                máy này.
              </span>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => {
                  setDuLieu(banNhapCu.duLieu);
                  setBuocHienTai(banNhapCu.buoc);
                  setBanNhapCu(null);
                }}
                className="min-h-[40px] rounded-lg bg-emerald-700 px-4 py-1.5 text-xs font-semibold text-white hover:bg-emerald-800 cursor-pointer"
              >
                Tiếp tục làm tiếp
              </button>
              <button
                type="button"
                onClick={() => {
                  xoaBanNhap();
                  setBanNhapCu(null);
                }}
                className="min-h-[40px] rounded-lg border border-emerald-300 bg-white px-3.5 py-1.5 text-xs font-medium text-emerald-900 hover:bg-emerald-100 cursor-pointer"
              >
                Bắt đầu mới
              </button>
            </div>
          </div>
        </div>
      )}

      {thongBaoChuyenBuoc && (
        <div className="mx-auto mt-4 w-full max-w-7xl px-4 sm:px-6">
          <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-medium text-amber-900">
            {thongBaoChuyenBuoc}
          </div>
        </div>
      )}

      <main className="flex-1">
        {buocHienTai === 1 && (
          <Buoc1ChonNganh
            nganhDangChon={duLieu.nganh}
            onChonNganh={xuLyChonNganh}
            onSangBuoc2={() => xuLyChuyenBuoc(2)}
            onNapDuLieuJson={(duLieuMoi) => {
              setDuLieu(duLieuMoi);
              setBanNhapCu(null);
              setBuocHienTai(2);
            }}
            onXemThuMauDayDu={() => {
              setDuLieu(BO_DU_LIEU_THU[0].duLieu);
              setBanNhapCu(null);
              setBuocHienTai(3);
            }}
          />
        )}

        {buocHienTai === 2 && (
          <Buoc2NhapThongTin
            duLieu={duLieu}
            onCapNhat={(capNhat) => setDuLieu((cu) => capNhat(cu))}
            onQuayLaiBuoc1={() => xuLyChuyenBuoc(1)}
            onSangBuoc3={() => xuLyChuyenBuoc(3)}
          />
        )}

        {buocHienTai === 3 && (
          <Buoc3XemTruocTheme
            duLieu={duLieu}
            maQrSvg={maQrSvg}
            onChonTheme={(maTheme) =>
              setDuLieu((cu) => ({
                ...cu,
                giaoDien: { ...cu.giaoDien, maTheme, mauChinh: null },
              }))
            }
            onQuayLaiBuoc2={() => xuLyChuyenBuoc(2)}
            onSangBuoc4={() => xuLyChuyenBuoc(4)}
          />
        )}

        {buocHienTai === 4 && (
          <Buoc4ChinhVaXuat
            duLieu={duLieu}
            maQrSvg={maQrSvg}
            onCapNhat={(capNhat) => setDuLieu((cu) => capNhat(cu))}
            onQuayLaiBuoc3={() => xuLyChuyenBuoc(3)}
          />
        )}
      </main>

      <footer className="border-t border-neutral-200 bg-white px-4 py-4 text-center text-xs text-neutral-500">
        Dữ liệu lưu trực tiếp trên trình duyệt của bạn · Nên tải file dự án (.json) để sao lưu an toàn.
      </footer>

      <HopThoaiDuLieuThu
        mo={moHopThoaiDuAn}
        duLieuHienTai={duLieu}
        onDong={() => setMoHopThoaiDuAn(false)}
        onNapDuLieu={(duLieuMoi, buocDich) => {
          setDuLieu(chuanHoaDuLieuNhap(duLieuMoi));
          setBanNhapCu(null);
          setThongBaoChuyenBuoc(null);
          if (buocDich) setBuocHienTai(buocDich);
        }}
        onBatDauLai={xuLyBatDauLai}
      />
    </div>
  );
}
