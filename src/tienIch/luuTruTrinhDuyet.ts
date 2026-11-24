import { DuLieuCuaHang } from '../kieuDuLieu';

const TEN_CSDL = 'tao_trang_cua_hang_viet_db';
const PHIEN_BAN_CSDL = 1;
const TEN_KHO = 'ban_nhap';
const KHOA_BAN_NHAP = 'cua_hang_hien_tai';
const KHOA_CAI_DAT_UI = 'tao_trang_viet_cai_dat_ui';

export interface CaiDatGiaoDienApp {
  buocHienTai: number;
  thoiGianLuuCuoi: number;
}

function moKetNoiIndexedDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof indexedDB === 'undefined') {
      reject(new Error('Trình duyệt không hỗ trợ IndexedDB.'));
      return;
    }
    const yeuCau = indexedDB.open(TEN_CSDL, PHIEN_BAN_CSDL);
    yeuCau.onupgradeneeded = () => {
      const db = yeuCau.result;
      if (!db.objectStoreNames.contains(TEN_KHO)) {
        db.createObjectStore(TEN_KHO);
      }
    };
    yeuCau.onsuccess = () => resolve(yeuCau.result);
    yeuCau.onerror = () => reject(yeuCau.error || new Error('Lỗi mở IndexedDB.'));
  });
}

// Lưu toàn bộ dữ liệu cửa hàng (bao gồm ảnh đã nén) vào IndexedDB
export async function luuBanNhap(duLieu: DuLieuCuaHang): Promise<void> {
  try {
    const db = await moKetNoiIndexedDB();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(TEN_KHO, 'readwrite');
      const kho = tx.objectStore(TEN_KHO);
      kho.put({ duLieu, capNhatLuc: Date.now() }, KHOA_BAN_NHAP);
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
    db.close();
  } catch {
    // Bỏ qua lặng lẽ nếu trình duyệt ở chế độ ẩn danh chặt chẽ
  }
}

// Đọc bản nháp đã lưu trong IndexedDB
export async function docBanNhap(): Promise<{
  duLieu: DuLieuCuaHang;
  capNhatLuc: number;
} | null> {
  try {
    const db = await moKetNoiIndexedDB();
    const ketQua = await new Promise<{ duLieu: DuLieuCuaHang; capNhatLuc: number } | null>(
      (resolve, reject) => {
        const tx = db.transaction(TEN_KHO, 'readonly');
        const kho = tx.objectStore(TEN_KHO);
        const yeuCau = kho.get(KHOA_BAN_NHAP);
        yeuCau.onsuccess = () => resolve(yeuCau.result || null);
        yeuCau.onerror = () => reject(yeuCau.error);
      }
    );
    db.close();
    return ketQua;
  } catch {
    return null;
  }
}

// Xóa bản nháp khi người dùng chọn "Bắt đầu lại"
export async function xoaBanNhap(): Promise<void> {
  try {
    const db = await moKetNoiIndexedDB();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(TEN_KHO, 'readwrite');
      const kho = tx.objectStore(TEN_KHO);
      kho.delete(KHOA_BAN_NHAP);
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
    db.close();
  } catch {
    // Bỏ qua nếu không xóa được
  }
  try {
    localStorage.removeItem(KHOA_CAI_DAT_UI);
  } catch {
    // Bỏ qua
  }
}

// Lưu cài đặt nhỏ (bước đang làm) vào localStorage
export function luuCaiDatUi(caiDat: CaiDatGiaoDienApp): void {
  try {
    localStorage.setItem(KHOA_CAI_DAT_UI, JSON.stringify(caiDat));
  } catch {
    // Bỏ qua
  }
}

export function docCaiDatUi(): CaiDatGiaoDienApp | null {
  try {
    const chuoi = localStorage.getItem(KHOA_CAI_DAT_UI);
    if (!chuoi) return null;
    return JSON.parse(chuoi) as CaiDatGiaoDienApp;
  } catch {
    return null;
  }
}
