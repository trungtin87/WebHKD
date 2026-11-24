import { DuLieuCuaHang, MaKhoiHienThi, ThemeGiaoDien, TuyChonVeTrang } from '../kieuDuLieu';
import { lamSachHtml } from '../tienIch/xuLyDuLieu';
import {
  bocKhungTaiLieuHtml,
  layCssNenChung,
  layNguonAnh,
  layThongTinLienHe,
  taoNhanGiaSanPham,
  veDieuHuongNhanh,
  veKhoiCauCamOnChung,
  veKhoiDiaChiChung,
  veKhoiHoKinhDoanhChung,
  veKhoiLienHeChung,
  veThanhLienHeCoDinhMobile,
} from './congCuDungTrang';

// Theme 10: Sang Trọng Đêm Đen — Cảm hứng Webflow Dark Luxury, nền than tối tương phản cao & điểm nhấn vàng đồng
export const sangTrongToi: ThemeGiaoDien = {
  ma: 'sangTrongToi',
  ten: 'Sang trọng đêm đen',
  moTaNgan: 'Phong cách Webflow Dark Luxury nền than tối tương phản cao, điểm nhấn vàng đồng cho đặc sản biếu tặng & quán đêm.',
  phongCach: 'Webflow Dark Luxury · Cao cấp',
  nganhPhuHop: ['thuCong', 'thoiTrang', 'amThuc', 'dichVu'],
  bangMau: {
    nen: '#0F1115',
    beMat: '#171A21',
    chinh: '#B4832C',
    nhan: '#D97706',
    chu: '#F3F4F6',
    chuPhu: '#A1A8B3',
    vien: '#2A2F3A',
  },
  mauGoiY: ['#B4832C', '#0D9488', '#DC2626', '#2563EB', '#7C3AED'],
  fontChu: {
    tieuDe: 'Playfair Display',
    noiDung: 'Plus Jakarta Sans',
  },
  kieuDauTrang: 'bannerAnhLon',
  kieuSanPham: 'menuDoc',
  hoaTiet: 'toiGian',
  veTrang: (duLieu: DuLieuCuaHang, tuyChon: TuyChonVeTrang): string => {
    const bangMau = {
      ...sangTrongToi.bangMau,
      chinh: tuyChon.mauChinhTuyChon || duLieu.giaoDien.mauChinh || sangTrongToi.bangMau.chinh,
    };
    const lh = layThongTinLienHe(duLieu);
    const anhBanner = layNguonAnh(duLieu.anhBanner, 'anhBanner', tuyChon);

    const cssRieng = `
      .st-dau-trang {
        background-color: rgba(15, 17, 21, 0.96);
        border-bottom: 1px solid var(--mau-vien);
        padding: 12px 0;
      }
      .st-thanh-tren {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 16px;
      }
      .st-cum-ten {
        display: flex;
        align-items: center;
        gap: 10px;
        min-width: 0;
      }
      .st-ten-ch {
        margin: 0;
        font-family: var(--font-tieu-de);
        font-size: 1.25rem;
        font-weight: 700;
        color: #FFFFFF;
        overflow-wrap: anywhere;
      }
      .st-banner {
        position: relative;
        background-color: var(--mau-be-mat);
        border-bottom: 1px solid var(--mau-vien);
        padding: 32px 0;
      }
      .st-banner-luoi {
        display: grid;
        grid-template-columns: 1fr;
        gap: 20px;
        align-items: center;
      }
      .st-tieu-de {
        font-family: var(--font-tieu-de);
        font-size: clamp(1.85rem, 4.4vw, 3rem);
        font-weight: 700;
        line-height: 1.18;
        margin: 0 0 10px 0;
        color: #FFFFFF;
        text-wrap: balance;
      }
      .st-anh-banner {
        width: 100%;
        height: 220px;
        object-fit: cover;
        border-radius: 12px;
        border: 1px solid var(--mau-vien);
      }
      .st-luoi-sp {
        display: grid;
        grid-template-columns: 1fr;
        gap: 14px;
      }
      .st-the-sp {
        background-color: var(--mau-be-mat);
        border: 1px solid var(--mau-vien);
        border-radius: 14px;
        padding: 16px;
        display: flex;
        flex-direction: column;
        height: 100%;
      }
      .st-the-sp.noi-bat {
        border-color: var(--mau-chinh);
      }
      .st-the-sp img {
        width: 100%;
        aspect-ratio: 4 / 3;
        object-fit: cover;
        border-radius: 10px;
        margin-bottom: 12px;
      }
      .st-sp-ten {
        font-family: var(--font-tieu-de);
        font-size: 1.2rem;
        font-weight: 700;
        margin: 0 0 4px 0;
        color: #FFFFFF;
        overflow-wrap: anywhere;
      }
      .st-sp-mo-ta {
        margin: 6px 0 10px 0;
        font-size: 0.88rem;
        color: var(--mau-chu-phu);
        flex: 1;
        overflow-wrap: anywhere;
      }
      .gia-san-pham { color: #FBBF24; }
      .gia-tu-van { color: #E5C178; }
      .nhan-noi-bat { color: #FBBF24; }
      .nut-zalo-sp {
        border-color: var(--mau-chinh);
        color: #FDE68A;
      }
      .nut-zalo-sp:hover {
        background-color: var(--mau-chinh);
        color: #FFFFFF;
      }
      .mang-xa-hoi a { color: #FBBF24; }
      .cau-cam-on { color: #FBBF24; }
      @media (min-width: 768px) {
        .st-banner { padding: 48px 0; }
        .st-banner-luoi.co-anh { grid-template-columns: 1.1fr 0.9fr; gap: 36px; }
        .st-anh-banner { height: 290px; }
        .st-luoi-sp { grid-template-columns: repeat(2, 1fr); gap: 18px; }
      }
      @media (min-width: 1000px) {
        .st-luoi-sp { grid-template-columns: repeat(3, 1fr); }
      }
    `;

    const veKhoi: Record<MaKhoiHienThi, () => string> = {
      dauTrang: () => `
        <header class="st-dau-trang">
          <div class="khung-noi-dung st-thanh-tren">
            <div class="st-cum-ten">
              <span class="st-ten-ch">${lamSachHtml(duLieu.tenCuaHang || 'Tên cửa hàng')}</span>
            </div>
            ${veDieuHuongNhanh(duLieu)}
            ${
              lh.soZaloSach
                ? `<a class="nut-chinh" href="${lamSachHtml(lh.linkZalo)}" target="_blank" rel="noopener noreferrer">Nhắn Zalo</a>`
                : ''
            }
          </div>
        </header>
      `,
      banner: () => `
        <section class="st-banner">
          <div class="khung-noi-dung st-banner-luoi ${anhBanner ? 'co-anh' : ''}">
            <div>
              <h1 class="st-tieu-de">${lamSachHtml(duLieu.tenCuaHang || 'Cửa hàng')}</h1>
              ${duLieu.khauHieu.trim() ? `<p style="margin:0 0 18px 0;color:var(--mau-chu-phu);">${lamSachHtml(duLieu.khauHieu)}</p>` : ''}
              <div style="display:flex;flex-wrap:wrap;gap:10px;">
                ${lh.soZaloSach ? `<a class="nut-chinh" href="${lamSachHtml(lh.linkZalo)}" target="_blank" rel="noopener noreferrer">Nhắn Zalo đặt hàng</a>` : ''}
                ${lh.soGoiSach ? `<a class="nut-phu" href="${lamSachHtml(lh.linkGoi)}">Gọi ${lamSachHtml(lh.soGoiHienThi)}</a>` : ''}
              </div>
            </div>
            ${anhBanner ? `<img class="st-anh-banner" src="${lamSachHtml(anhBanner)}" alt="Ảnh bìa ${lamSachHtml(duLieu.tenCuaHang)}" />` : ''}
          </div>
        </section>
      `,
      sanPham: () => {
        if (!duLieu.danhSachSanPham.length) return '';
        return `
          <section class="khoi-chung" id="san-pham">
            <div class="khung-noi-dung">
              <h2 class="tieu-de-khoi">Bộ sưu tập &amp; Giá niêm yết</h2>
              <div class="st-luoi-sp">
                ${duLieu.danhSachSanPham
                  .map((sp, idx) => {
                    const anhSp = layNguonAnh(sp.anh, `sp_${idx}`, tuyChon);
                    const { chuGia, laGiaCuThe } = taoNhanGiaSanPham(sp);
                    return `
                      <article class="st-the-sp ${sp.noiBat ? 'noi-bat' : ''}">
                        ${anhSp ? `<img src="${lamSachHtml(anhSp)}" alt="${lamSachHtml(sp.ten)}" />` : ''}
                        ${sp.noiBat ? `<span class="nhan-noi-bat">Tuyển chọn đặc biệt</span>` : ''}
                        <h3 class="st-sp-ten">${lamSachHtml(sp.ten)}</h3>
                        <div class="${laGiaCuThe ? 'gia-san-pham' : 'gia-tu-van'}">${chuGia}</div>
                        ${sp.moTa.trim() ? `<p class="st-sp-mo-ta">${lamSachHtml(sp.moTa)}</p>` : '<div style="flex:1"></div>'}
                        ${
                          lh.soZaloSach
                            ? `<a class="nut-zalo-sp" href="${lamSachHtml(lh.linkZalo)}" target="_blank" rel="noopener noreferrer">Liên hệ qua Zalo</a>`
                            : ''
                        }
                      </article>
                    `;
                  })
                  .join('')}
              </div>
            </div>
          </section>
        `;
      },
      gioiThieu: () => {
        const coDoanVan = duLieu.gioiThieu.doanVan.trim().length > 0;
        const cacDiem = duLieu.gioiThieu.diemNoiBat.filter((d) => d.trim().length > 0);
        if (!coDoanVan && !cacDiem.length) return '';
        return `
          <section class="khoi-chung" id="gioi-thieu">
            <div class="khung-noi-dung">
              <div class="hkd-the">
                <h2 class="tieu-de-khoi">Giá trị cam kết</h2>
                ${coDoanVan ? `<p style="margin:0 0 12px 0;color:var(--mau-chu-phu);">${lamSachHtml(duLieu.gioiThieu.doanVan)}</p>` : ''}
                ${
                  cacDiem.length
                    ? `<div style="display:flex;flex-wrap:wrap;gap:8px 18px;color:#FBBF24;font-weight:600;font-size:0.9rem;">
                        ${cacDiem.map((d) => `<span>◆ ${lamSachHtml(d)}</span>`).join('')}
                      </div>`
                    : ''
                }
              </div>
            </div>
          </section>
        `;
      },
      hoKinhDoanh: () => veKhoiHoKinhDoanhChung(duLieu),
      diaChi: () => veKhoiDiaChiChung(duLieu, tuyChon),
      lienHe: () => veKhoiLienHeChung(duLieu, tuyChon),
      cauCamOn: () => veKhoiCauCamOnChung(duLieu),
    };

    const noiDungBody =
      duLieu.giaoDien.cacKhoiHienThi.map((maKhoi) => veKhoi[maKhoi]?.() || '').join('\n') +
      veThanhLienHeCoDinhMobile(duLieu);

    const cssTongHop =
      layCssNenChung(bangMau, sangTrongToi.fontChu.tieuDe, sangTrongToi.fontChu.noiDung) + cssRieng;

    return bocKhungTaiLieuHtml({
      duLieu,
      fontTieuDe: sangTrongToi.fontChu.tieuDe,
      fontNoiDung: sangTrongToi.fontChu.noiDung,
      cssTongHop,
      noiDungBody,
    });
  },
};
