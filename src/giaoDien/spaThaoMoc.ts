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

// Theme 9: Spa & Thảo Mộc — Cảm hứng Webflow Botanical Wellness, tông xanh rêu dịu nhẹ & khung bo mềm
export const spaThaoMoc: ThemeGiaoDien = {
  ma: 'spaThaoMoc',
  ten: 'Thảo mộc dịu mát',
  moTaNgan: 'Phong cách Webflow Wellness xanh rêu dịu mắt, bo tròn mềm mại cho mỹ phẩm, trà và nông sản sạch.',
  phongCach: 'Webflow Wellness · Thảo mộc & Spa',
  nganhPhuHop: ['myPham', 'nongSan', 'thuCong', 'dichVu'],
  bangMau: {
    nen: '#F3F6F3',
    beMat: '#FFFFFF',
    chinh: '#2D5A43',
    nhan: '#B45309',
    chu: '#1B2E24',
    chuPhu: '#4D6457',
    vien: '#DCE5DE',
  },
  mauGoiY: ['#2D5A43', '#15803D', '#0F766E', '#7C3A1D', '#4338CA'],
  fontChu: {
    tieuDe: 'Fraunces',
    noiDung: 'Nunito',
  },
  kieuDauTrang: 'chuGiuaNenMau',
  kieuSanPham: 'anhLonXenKe',
  hoaTiet: 'laCay',
  veTrang: (duLieu: DuLieuCuaHang, tuyChon: TuyChonVeTrang): string => {
    const bangMau = {
      ...spaThaoMoc.bangMau,
      chinh: tuyChon.mauChinhTuyChon || duLieu.giaoDien.mauChinh || spaThaoMoc.bangMau.chinh,
    };
    const lh = layThongTinLienHe(duLieu);
    const anhBanner = layNguonAnh(duLieu.anhBanner, 'anhBanner', tuyChon);
    const hoaTiet = taoHoaTietNenCss('laCay', bangMau.chinh);

    const cssRieng = `
      .tm-dau-trang {
        background-color: var(--mau-be-mat);
        border-bottom: 1px solid var(--mau-vien);
        padding: 12px 0;
      }
      .tm-thanh-tren {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 14px;
      }
      .tm-cum-ten {
        display: flex;
        align-items: center;
        gap: 10px;
        min-width: 0;
      }
      .tm-ten-ch {
        margin: 0;
        font-family: var(--font-tieu-de);
        font-size: 1.2rem;
        font-weight: 700;
        color: var(--mau-chinh);
        overflow-wrap: anywhere;
      }
      .tm-banner {
        background-color: var(--mau-be-mat);
        background-image: ${hoaTiet};
        border-bottom: 1px solid var(--mau-vien);
        padding: 28px 0;
        text-align: center;
      }
      .tm-tieu-de {
        font-family: var(--font-tieu-de);
        font-size: clamp(1.8rem, 4.2vw, 2.85rem);
        font-weight: 700;
        line-height: 1.2;
        margin: 0 auto 10px auto;
        max-width: 720px;
        color: var(--mau-chinh);
        text-wrap: balance;
      }
      .tm-anh-vong-cung {
        margin: 22px auto 0 auto;
        max-width: 680px;
        border-radius: 180px 180px 18px 18px;
        overflow: hidden;
        border: 1px solid var(--mau-vien);
      }
      .tm-anh-vong-cung img {
        width: 100%;
        max-height: 320px;
        object-fit: cover;
      }
      .tm-luoi-sp {
        display: grid;
        grid-template-columns: 1fr;
        gap: 16px;
      }
      .tm-the-sp {
        background-color: var(--mau-be-mat);
        border: 1px solid var(--mau-vien);
        border-radius: 20px;
        padding: 16px;
        display: flex;
        flex-direction: column;
        height: 100%;
      }
      .tm-the-sp img {
        width: 100%;
        aspect-ratio: 4 / 3;
        object-fit: cover;
        border-radius: 14px;
        margin-bottom: 12px;
      }
      .tm-sp-ten {
        font-family: var(--font-tieu-de);
        font-size: 1.18rem;
        font-weight: 700;
        margin: 0 0 4px 0;
        overflow-wrap: anywhere;
      }
      .tm-sp-mo-ta {
        margin: 6px 0 10px 0;
        font-size: 0.9rem;
        color: var(--mau-chu-phu);
        flex: 1;
        overflow-wrap: anywhere;
      }
      @media (min-width: 768px) {
        .tm-banner { padding: 44px 0; }
        .tm-luoi-sp { grid-template-columns: repeat(2, 1fr); gap: 20px; }
      }
      @media (min-width: 1000px) {
        .tm-luoi-sp { grid-template-columns: repeat(3, 1fr); }
      }
    `;

    const veKhoi: Record<MaKhoiHienThi, () => string> = {
      dauTrang: () => `
        <header class="tm-dau-trang">
          <div class="khung-noi-dung tm-thanh-tren">
            <div class="tm-cum-ten">
              <span class="tm-ten-ch">${lamSachHtml(duLieu.tenCuaHang || 'Cửa hàng')}</span>
            </div>
            ${veDieuHuongNhanh(duLieu)}
            ${
              lh.soZaloSach
                ? `<a class="nut-chinh" href="${lamSachHtml(lh.linkZalo)}" target="_blank" rel="noopener noreferrer">Tư vấn Zalo</a>`
                : ''
            }
          </div>
        </header>
      `,
      banner: () => `
        <section class="tm-banner">
          <div class="khung-noi-dung">
            <h1 class="tm-tieu-de">${lamSachHtml(duLieu.tenCuaHang || 'Tên cửa hàng')}</h1>
            ${duLieu.khauHieu.trim() ? `<p style="margin:0 auto 18px auto;max-width:560px;color:var(--mau-chu-phu);">${lamSachHtml(duLieu.khauHieu)}</p>` : ''}
            <div style="display:flex;justify-content:center;flex-wrap:wrap;gap:10px;">
              ${lh.soZaloSach ? `<a class="nut-chinh" href="${lamSachHtml(lh.linkZalo)}" target="_blank" rel="noopener noreferrer">Nhắn Zalo đặt hàng</a>` : ''}
              ${lh.soGoiSach ? `<a class="nut-phu" href="${lamSachHtml(lh.linkGoi)}">Gọi ${lamSachHtml(lh.soGoiHienThi)}</a>` : ''}
            </div>
            ${
              anhBanner
                ? `<div class="tm-anh-vong-cung"><img src="${lamSachHtml(anhBanner)}" alt="Ảnh bìa ${lamSachHtml(duLieu.tenCuaHang)}" /></div>`
                : ''
            }
          </div>
        </section>
      `,
      sanPham: () => {
        if (!duLieu.danhSachSanPham.length) return '';
        return `
          <section class="khoi-chung" id="san-pham">
            <div class="khung-noi-dung">
              <h2 class="tieu-de-khoi" style="text-align:center;">Sản phẩm thiên nhiên &amp; Bảng giá</h2>
              <div class="tm-luoi-sp">
                ${duLieu.danhSachSanPham
                  .map((sp, idx) => {
                    const anhSp = layNguonAnh(sp.anh, `sp_${idx}`, tuyChon);
                    const { chuGia, laGiaCuThe } = taoNhanGiaSanPham(sp);
                    return `
                      <article class="tm-the-sp">
                        ${anhSp ? `<img src="${lamSachHtml(anhSp)}" alt="${lamSachHtml(sp.ten)}" />` : ''}
                        ${sp.noiBat ? `<span class="nhan-noi-bat">Được yêu thích</span>` : ''}
                        <h3 class="tm-sp-ten">${lamSachHtml(sp.ten)}</h3>
                        <div class="${laGiaCuThe ? 'gia-san-pham' : 'gia-tu-van'}">${chuGia}</div>
                        ${sp.moTa.trim() ? `<p class="tm-sp-mo-ta">${lamSachHtml(sp.moTa)}</p>` : '<div style="flex:1"></div>'}
                        ${
                          lh.soZaloSach
                            ? `<a class="nut-zalo-sp" href="${lamSachHtml(lh.linkZalo)}" target="_blank" rel="noopener noreferrer">Nhắn Zalo tư vấn</a>`
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
              <div class="hkd-the" style="text-align:center;">
                <h2 class="tieu-de-khoi">Tâm huyết của cửa hàng</h2>
                ${coDoanVan ? `<p style="margin:0 auto 14px auto;max-width:700px;color:var(--mau-chu-phu);">${lamSachHtml(duLieu.gioiThieu.doanVan)}</p>` : ''}
                ${
                  cacDiem.length
                    ? `<div style="display:flex;flex-wrap:wrap;justify-content:center;gap:8px 20px;color:var(--mau-chinh);font-weight:600;font-size:0.92rem;">
                        ${cacDiem.map((d) => `<span>🌿 ${lamSachHtml(d)}</span>`).join('')}
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
      layCssNenChung(bangMau, spaThaoMoc.fontChu.tieuDe, spaThaoMoc.fontChu.noiDung) + cssRieng;

    return bocKhungTaiLieuHtml({
      duLieu,
      fontTieuDe: spaThaoMoc.fontChu.tieuDe,
      fontNoiDung: spaThaoMoc.fontChu.noiDung,
      cssTongHop,
      noiDungBody,
    });
  },
};
