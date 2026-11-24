import { DuLieuCuaHang, MaKhoiHienThi, ThemeGiaoDien, TuyChonVeTrang } from '../kieuDuLieu';
import { lamSachHtml } from '../tienIch/xuLyDuLieu';
import {
  bocKhungTaiLieuHtml,
  layCssNenChung,
  layNguonAnh,
  layThongTinLienHe,
  taoHoaTietNenCss,
  taoNhanGiaSanPham,
  veDieuHuongNhanh,
  veKhoiCauCamOnChung,
  veKhoiDiaChiChung,
  veKhoiHoKinhDoanhChung,
  veKhoiLienHeChung,
  veThanhLienHeCoDinhMobile,
} from './congCuDungTrang';

// Theme 8: Sài Gòn Hoài Niệm — Phong cách Webflow Neo-Retro kết hợp gạch bông & bảng hiệu Sài Gòn
export const saiGonRetro: ThemeGiaoDien = {
  ma: 'saiGonRetro',
  ten: 'Sài Gòn hoài niệm',
  moTaNgan: 'Phong cách Webflow Retro viền nét đậm kết hợp gạch bông Sài Gòn xưa, trẻ trung và nổi bật.',
  phongCach: 'Webflow Retro · Bảng hiệu Sài Gòn',
  nganhPhuHop: ['amThuc', 'thoiTrang', 'thuCong', 'khac'],
  bangMau: {
    nen: '#FFFBEB',
    beMat: '#FFFFFF',
    chinh: '#0F766E',
    nhan: '#DC2626',
    chu: '#1F2937',
    chuPhu: '#4B5563',
    vien: '#1F2937',
  },
  mauGoiY: ['#0F766E', '#DC2626', '#B45309', '#1D4ED8', '#7C2D12'],
  fontChu: {
    tieuDe: 'Archivo',
    noiDung: 'Be Vietnam Pro',
  },
  kieuDauTrang: 'bannerAnhLon',
  kieuSanPham: 'luoiThe',
  hoaTiet: 'gachBong',
  veTrang: (duLieu: DuLieuCuaHang, tuyChon: TuyChonVeTrang): string => {
    const bangMau = {
      ...saiGonRetro.bangMau,
      chinh: tuyChon.mauChinhTuyChon || duLieu.giaoDien.mauChinh || saiGonRetro.bangMau.chinh,
    };
    const lh = layThongTinLienHe(duLieu);
    const anhBanner = layNguonAnh(duLieu.anhBanner, 'anhBanner', tuyChon);
    const hoaTiet = taoHoaTietNenCss('gachBong', bangMau.chinh);

    const cssRieng = `
      body { background-image: ${hoaTiet}; }
      .sg-dau-trang {
        background-color: var(--mau-be-mat);
        border-bottom: 2px solid var(--mau-vien);
        padding: 10px 0;
      }
      .sg-thanh-tren {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 14px;
      }
      .sg-cum-ten {
        display: flex;
        align-items: center;
        gap: 10px;
        min-width: 0;
      }
      .sg-ten-ch {
        margin: 0;
        font-family: var(--font-tieu-de);
        font-weight: 700;
        font-size: clamp(1.1rem, 2.5vw, 1.45rem);
        overflow-wrap: anywhere;
      }
      .sg-hero-khung {
        padding: 20px 0 8px 0;
      }
      .sg-the-noi {
        background-color: var(--mau-be-mat);
        border: 2px solid var(--mau-vien);
        border-radius: 14px;
        box-shadow: 4px 4px 0 var(--mau-vien);
        padding: 18px;
        display: grid;
        grid-template-columns: 1fr;
        gap: 18px;
        align-items: center;
      }
      .sg-tieu-de {
        font-family: var(--font-tieu-de);
        font-size: clamp(1.65rem, 4vw, 2.6rem);
        font-weight: 700;
        line-height: 1.15;
        margin: 0 0 10px 0;
        color: var(--mau-chinh);
        text-wrap: balance;
      }
      .sg-the-noi img {
        width: 100%;
        height: 220px;
        object-fit: cover;
        border-radius: 10px;
        border: 2px solid var(--mau-vien);
      }
      .sg-luoi-sp {
        display: grid;
        grid-template-columns: 1fr;
        gap: 16px;
      }
      .sg-the-sp {
        background-color: var(--mau-be-mat);
        border: 2px solid var(--mau-vien);
        border-radius: 14px;
        box-shadow: 3px 3px 0 var(--mau-vien);
        padding: 14px;
        display: flex;
        flex-direction: column;
        height: 100%;
      }
      .sg-the-sp img {
        width: 100%;
        aspect-ratio: 4 / 3;
        object-fit: cover;
        border-radius: 8px;
        border: 1.5px solid var(--mau-vien);
        margin-bottom: 10px;
      }
      .sg-sp-ten {
        font-family: var(--font-tieu-de);
        font-size: 1.12rem;
        font-weight: 700;
        margin: 0 0 4px 0;
        overflow-wrap: anywhere;
      }
      .sg-sp-mo-ta {
        margin: 6px 0 10px 0;
        font-size: 0.88rem;
        color: var(--mau-chu-phu);
        flex: 1;
        overflow-wrap: anywhere;
      }
      .hkd-the, .dia-chi-luoi, .the-lien-he {
        border: 2px solid var(--mau-vien);
        box-shadow: 3px 3px 0 var(--mau-vien);
      }
      @media (min-width: 768px) {
        .sg-hero-khung { padding: 30px 0 12px 0; }
        .sg-the-noi { padding: 28px; }
        .sg-the-noi.co-anh { grid-template-columns: 1.1fr 0.9fr; gap: 28px; }
        .sg-the-noi img { height: 270px; }
        .sg-luoi-sp { grid-template-columns: repeat(2, 1fr); gap: 18px; }
      }
      @media (min-width: 1000px) {
        .sg-luoi-sp { grid-template-columns: repeat(3, 1fr); }
      }
    `;

    const veKhoi: Record<MaKhoiHienThi, () => string> = {
      dauTrang: () => `
        <header class="sg-dau-trang">
          <div class="khung-noi-dung sg-thanh-tren">
            <div class="sg-cum-ten">
              <span class="sg-ten-ch">${lamSachHtml(duLieu.tenCuaHang || 'Cửa hàng')}</span>
            </div>
            ${veDieuHuongNhanh(duLieu)}
            ${
              lh.soZaloSach
                ? `<a class="nut-goi" href="${lamSachHtml(lh.linkZalo)}" target="_blank" rel="noopener noreferrer">Nhắn Zalo</a>`
                : ''
            }
          </div>
        </header>
      `,
      banner: () => `
        <section class="sg-hero-khung">
          <div class="khung-noi-dung">
            <div class="sg-the-noi ${anhBanner ? 'co-anh' : ''}">
              <div>
                <h1 class="sg-tieu-de">${lamSachHtml(duLieu.tenCuaHang || 'Tên cửa hàng')}</h1>
                ${duLieu.khauHieu.trim() ? `<p style="margin:0 0 16px 0;color:var(--mau-chu-phu);">${lamSachHtml(duLieu.khauHieu)}</p>` : ''}
                <div style="display:flex;flex-wrap:wrap;gap:10px;">
                  ${lh.soZaloSach ? `<a class="nut-chinh" href="${lamSachHtml(lh.linkZalo)}" target="_blank" rel="noopener noreferrer">Nhắn Zalo ngay</a>` : ''}
                  ${lh.soGoiSach ? `<a class="nut-goi" href="${lamSachHtml(lh.linkGoi)}">Gọi ${lamSachHtml(lh.soGoiHienThi)}</a>` : ''}
                </div>
              </div>
              ${anhBanner ? `<img src="${lamSachHtml(anhBanner)}" alt="Ảnh bìa ${lamSachHtml(duLieu.tenCuaHang)}" />` : ''}
            </div>
          </div>
        </section>
      `,
      sanPham: () => {
        if (!duLieu.danhSachSanPham.length) return '';
        return `
          <section class="khoi-chung" id="san-pham">
            <div class="khung-noi-dung">
              <h2 class="tieu-de-khoi">Mặt hàng &amp; Giá niêm yết</h2>
              <div class="sg-luoi-sp">
                ${duLieu.danhSachSanPham
                  .map((sp, idx) => {
                    const anhSp = layNguonAnh(sp.anh, `sp_${idx}`, tuyChon);
                    const { chuGia, laGiaCuThe } = taoNhanGiaSanPham(sp);
                    return `
                      <article class="sg-the-sp">
                        ${anhSp ? `<img src="${lamSachHtml(anhSp)}" alt="${lamSachHtml(sp.ten)}" />` : ''}
                        ${sp.noiBat ? `<span class="nhan-noi-bat">Món nổi bật</span>` : ''}
                        <h3 class="sg-sp-ten">${lamSachHtml(sp.ten)}</h3>
                        <div class="${laGiaCuThe ? 'gia-san-pham' : 'gia-tu-van'}">${chuGia}</div>
                        ${sp.moTa.trim() ? `<p class="sg-sp-mo-ta">${lamSachHtml(sp.moTa)}</p>` : '<div style="flex:1"></div>'}
                        ${
                          lh.soZaloSach
                            ? `<a class="nut-zalo-sp" href="${lamSachHtml(lh.linkZalo)}" target="_blank" rel="noopener noreferrer">Nhắn Zalo mua ngay</a>`
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
                <h2 class="tieu-de-khoi">Giới thiệu tiệm</h2>
                ${coDoanVan ? `<p style="margin:0 0 12px 0;color:var(--mau-chu-phu);">${lamSachHtml(duLieu.gioiThieu.doanVan)}</p>` : ''}
                ${
                  cacDiem.length
                    ? `<div style="display:flex;flex-wrap:wrap;gap:8px 18px;font-weight:700;color:var(--mau-chinh);font-size:0.92rem;">
                        ${cacDiem.map((d) => `<span>★ ${lamSachHtml(d)}</span>`).join('')}
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
      layCssNenChung(bangMau, saiGonRetro.fontChu.tieuDe, saiGonRetro.fontChu.noiDung) + cssRieng;

    return bocKhungTaiLieuHtml({
      duLieu,
      fontTieuDe: saiGonRetro.fontChu.tieuDe,
      fontNoiDung: saiGonRetro.fontChu.noiDung,
      cssTongHop,
      noiDungBody,
    });
  },
};
