import QRCode from 'qrcode';
import { CHAT_LUONG_NEN_ANH, KICH_THUOC_ANH_TOI_DA } from '../kieuDuLieu';

// Thu nhỏ ảnh về cạnh dài tối đa 1600px và nén JPEG/WebP chất lượng 0.8 ngay trên trình duyệt
export function nenVaThuNhoAnh(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const docFile = new FileReader();
    docFile.onerror = () => reject(new Error('Không thể đọc file ảnh đã chọn.'));
    docFile.onload = () => {
      const hinhAnh = new Image();
      hinhAnh.onerror = () => reject(new Error('File tải lên không phải là ảnh hợp lệ.'));
      hinhAnh.onload = () => {
        let chieuRong = hinhAnh.naturalWidth || hinhAnh.width;
        let chieuCao = hinhAnh.naturalHeight || hinhAnh.height;

        if (chieuRong > KICH_THUOC_ANH_TOI_DA || chieuCao > KICH_THUOC_ANH_TOI_DA) {
          if (chieuRong >= chieuCao) {
            chieuCao = Math.round((chieuCao * KICH_THUOC_ANH_TOI_DA) / chieuRong);
            chieuRong = KICH_THUOC_ANH_TOI_DA;
          } else {
            chieuRong = Math.round((chieuRong * KICH_THUOC_ANH_TOI_DA) / chieuCao);
            chieuCao = KICH_THUOC_ANH_TOI_DA;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = chieuRong;
        canvas.height = chieuCao;
        const nguCanh = canvas.getContext('2d');
        if (!nguCanh) {
          reject(new Error('Trình duyệt không hỗ trợ xử lý ảnh.'));
          return;
        }

        // Vẽ nền trắng nhẹ phòng trường hợp ảnh PNG trong suốt chuyển sang JPEG
        nguCanh.fillStyle = '#FFFFFF';
        nguCanh.fillRect(0, 0, chieuRong, chieuCao);
        nguCanh.drawImage(hinhAnh, 0, 0, chieuRong, chieuCao);

        // Ưu tiên WebP nếu nhẹ, dự phòng JPEG
        let ketQua = canvas.toDataURL('image/webp', CHAT_LUONG_NEN_ANH);
        if (!ketQua.startsWith('data:image/webp')) {
          ketQua = canvas.toDataURL('image/jpeg', CHAT_LUONG_NEN_ANH);
        }
        resolve(ketQua);
      };
      hinhAnh.src = String(docFile.result || '');
    };
    docFile.readAsDataURL(file);
  });
}

// Sinh mã QR dạng SVG nội tuyến ngay trên trình duyệt để file HTML xuất ra dùng được khi mất mạng
export async function taoMaQrSvg(noiDung: string, mauDam: string = '#111827'): Promise<string> {
  if (!noiDung || noiDung === '#') {
    return '';
  }
  try {
    const svg = await QRCode.toString(noiDung, {
      type: 'svg',
      margin: 1,
      width: 180,
      color: {
        dark: mauDam,
        light: '#FFFFFF',
      },
    });
    return svg;
  } catch {
    return '';
  }
}

// Tạo ảnh minh họa SVG nhẹ dạng Data URL cho bộ dữ liệu thử (không dùng URL ngoài)
export function taoAnhMinhHoaDuLieuThu(
  tieuDe: string,
  phuDe: string,
  mauNen1: string,
  mauNen2: string,
  chieuRong: number = 800,
  chieuCao: number = 600
): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${chieuRong}" height="${chieuCao}" viewBox="0 0 ${chieuRong} ${chieuCao}">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="${mauNen1}"/>
        <stop offset="100%" stop-color="${mauNen2}"/>
      </linearGradient>
    </defs>
    <rect width="100%" height="100%" fill="url(#g)"/>
    <circle cx="${chieuRong * 0.85}" cy="${chieuCao * 0.2}" r="${chieuCao * 0.28}" fill="rgba(255,255,255,0.12)"/>
    <circle cx="${chieuRong * 0.15}" cy="${chieuCao * 0.82}" r="${chieuCao * 0.22}" fill="rgba(255,255,255,0.08)"/>
    <rect x="44" y="44" width="${chieuRong - 88}" height="${chieuCao - 88}" rx="18" fill="none" stroke="rgba(255,255,255,0.28)" stroke-width="2"/>
    <text x="50%" y="48%" text-anchor="middle" fill="#FFFFFF" font-family="sans-serif" font-size="${Math.round(chieuCao * 0.085)}" font-weight="700">${tieuDe}</text>
    <text x="50%" y="60%" text-anchor="middle" fill="rgba(255,255,255,0.9)" font-family="sans-serif" font-size="${Math.round(chieuCao * 0.045)}">${phuDe}</text>
  </svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}
