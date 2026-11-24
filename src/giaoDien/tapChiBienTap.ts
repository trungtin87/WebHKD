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

// Theme 7: Tạp Chí Biên Tập — Cảm hứng Webflow Editorial / Lookbook đánh số mục 01, 02 tinh tế
export const tapChiBienTap: ThemeGiaoDien = {
  ma: 'tapChiBienTap',
  ten: 'Tạp chí biên tập',
  moTaNgan: 'Phong cách Webflow Editorial sang nhã, đánh số danh mục 01–12 và đường kẻ mảnh tinh tế.',
  phongCach: 'Webflow Editorial · Lookbook',
  nganhPhuHop: ['thoiTrang', 'myPham', 'thuCong'],
  bangMau: {
    nen: '#FAF8F5',
    beMat: '#FFFFFF',
    chinh: '#881337',
    nhan: '#1C1917',
    chu: '#1C1917',
    chuPhu: '#57534E',
    vien: '#E7E5E4',
  },
  mauGoiY: ['#881337', '#1C1917', '#1E3A8A', '#14532D', '#78350F'],
  fontChu: {
    tieuDe: 'Cormorant Garamond',
    noiDung: 'Be Vietnam Pro',
  },
  kieuDauTrang: 'chuGiuaNenMau',
  kieuSanPham: 'danhSachCoGia',
  hoaTiet: 'toiGian',
  veTrang: (duLieu: DuLieuCuaHang, tuyChon: TuyChonVeTrang): string => {
    const bangMau = {
      ...tapChiBienTap.bangMau,
      chinh: tuyChon.mauChinhTuyChon || duLieu.giaoDien.mauChinh || tapChiBienTap.bangMau.chinh,
    };
    const lh = layThongTinLienHe(duLieu);
    const anhBanner = layNguonAnh(duLieu.anhBanner, 'anhBanner', tuyChon);

    const cssRieng = `
      .ed-dau-trang {
        border-bottom: 1px solid var(--mau-vien);
        padding: 12px 0;
        background-color: var(--mau-nen);
      }
      .ed-thanh-tren {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 16px;
      }
      .ed-cum-ten {
        display: flex;
        align-items: center;
        gap: 10px;
        min-width: 0;
      }
      .ed-ten-nho {
        font-family: var(--font-tieu-de);
        font-size: 1.25rem;
        font-weight: 700;
        overflow-wrap: anywhere;
      }
      .ed-banner {
        padding: 28px 0;
        border-bottom: 1px solid var(--mau-vien);
      }
      .ed-banner-luoi {
        display: grid;
        grid-template-columns: 1fr;
        gap: 20px;
        align-items: center;
      }
      .ed-tieu-de {
        font-family: var(--font-tieu-de);
        font-size: clamp(2rem, 4.6vw, 3.3rem);
        font-weight: 700;
        line-height: 1.1;
        margin: 0 0 12px 0;
        text-wrap: balance;
      }
      .ed-anh-banner {
        width: 100%;
        aspect-ratio: 16 / 10;
        object-fit: cover;
        border-radius: 6px;
      }
      .ed-danh-muc {
        border-top: 1px solid var(--mau-chu);
      }
      .ed-hang-sp {
        display: grid;
        grid-template-columns: 1fr;
        gap: 12px;
        padding: 16px 0;
        border-bottom: 1px solid var(--mau-vien);
        align-items: center;
      }
      .ed-so-thu-tu {
        font-family: var(--font-tieu-de);
        font-size: 1.3rem;
        font-weight: 700;
        color: var(--mau-chinh);
        font-variant-numeric: tabular-nums;
      }
      .ed-sp-anh {
        width: 100%;
        aspect-ratio: 4 / 3;
        object-fit: cover;
        border-radius: 6px;
      }
      .ed-sp-ten {
        margin: 0 0 4px 0;
        font-family: var(--font-tieu-de);
        font-size: 1.32rem;
        font-weight: 700;
        overflow-wrap: anywhere;
      }
      @media (min-width: 768px) {
        .ed-banner { padding: 48px 0; }
        .ed-banner-luoi.co-anh { grid-template-columns: 1fr 1fr; gap: 36px; }
        .ed-hang-sp { grid-template-columns: 44px 120px 1fr auto; gap: 20px; padding: 20px 0; }
        .ed-hang-sp.khong-anh { grid-template-columns: 44px 1fr auto; }
        .ed-sp-anh { width: 120px; height: 90px; aspect-ratio: auto; }
      }
    `;

    const veKhoi: Record<MaKhoiHienThi, () => string> = {
      dauTrang: () => `
        <header class="ed-dau-trang">
          <div class="khung-noi-dung ed-thanh-tren">
            <div class="ed-cum-ten">
              <span class="ed-ten-nho">${lamSachHtml(duLieu.tenCuaHang || 'Tên cửa hàng')}</span>
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
        <section class="ed-banner">
          <div class="khung-noi-dung ed-banner-luoi ${anhBanner ? 'co-anh' : ''}">
            <div>
              <h1 class="ed-tieu-de">${lamSachHtml(duLieu.tenCuaHang || 'Cửa hàng')}</h1>
              ${duLieu.khauHieu.trim() ? `<p style="margin:0 0 18px 0;color:var(--mau-chu-phu);font-size:1.02rem;">${lamSachHtml(duLieu.khauHieu)}</p>` : ''}
              <div style="display:flex;flex-wrap:wrap;gap:10px;">
                ${lh.soZaloSach ? `<a class="nut-chinh" href="${lamSachHtml(lh.linkZalo)}" target="_blank" rel="noopener noreferrer">Đặt qua Zalo</a>` : ''}
                ${lh.soGoiSach ? `<a class="nut-phu" href="${lamSachHtml(lh.linkGoi)}">Gọi ${lamSachHtml(lh.soGoiHienThi)}</a>` : ''}
              </div>
            </div>
            ${anhBanner ? `<img class="ed-anh-banner" src="${lamSachHtml(anhBanner)}" alt="Ảnh bìa ${lamSachHtml(duLieu.tenCuaHang)}" />` : ''}
          </div>
        </section>
      `,
      sanPham: () => {
        if (!duLieu.danhSachSanPham.length) return '';
        return `
          <section class="khoi-chung" id="san-pham">
            <div class="khung-noi-dung">
              <h2 class="tieu-de-khoi">Danh mục tuyển chọn</h2>
              <div class="ed-danh-muc">
                ${duLieu.danhSachSanPham
                  .map((sp, idx) => {
                    const anhSp = layNguonAnh(sp.anh, `sp_${idx}`, tuyChon);
                    const { chuGia, laGiaCuThe } = taoNhanGiaSanPham(sp);
                    const so = String(idx + 1).padStart(2, '0');
                    return `
                      <article class="ed-hang-sp ${anhSp ? '' : 'khong-anh'}">
                        <div class="ed-so-thu-tu">${so}.</div>
                        ${anhSp ? `<img class="ed-sp-anh" src="${lamSachHtml(anhSp)}" alt="${lamSachHtml(sp.ten)}" />` : ''}
                        <div style="min-width:0;">
                          ${sp.noiBat ? `<span class="nhan-noi-bat">Gợi ý hàng đầu</span>` : ''}
                          <h3 class="ed-sp-ten">${lamSachHtml(sp.ten)}</h3>
                          ${sp.moTa.trim() ? `<p style="margin:2px 0 0 0;font-size:0.9rem;color:var(--mau-chu-phu);overflow-wrap:anywhere;">${lamSachHtml(sp.moTa)}</p>` : ''}
                        </div>
                        <div style="display:flex;flex-direction:column;align-items:flex-start;gap:6px;">
                          <span class="${laGiaCuThe ? 'gia-san-pham' : 'gia-tu-van'}" style="white-space:nowrap;">${chuGia}</span>
                          ${lh.soZaloSach ? `<a href="${lamSachHtml(lh.linkZalo)}" target="_blank" rel="noopener noreferrer" style="font-size:0.84rem;font-weight:600;color:var(--mau-chinh);text-decoration:underline;text-underline-offset:3px;">Hỏi mua Zalo</a>` : ''}
                        </div>
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
              <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:24px;border-top:1px solid var(--mau-vien);padding-top:24px;">
                <div>
                  <h2 class="tieu-de-khoi">Câu chuyện cửa hàng</h2>
                  ${coDoanVan ? `<p style="margin:0;color:var(--mau-chu-phu);line-height:1.7;">${lamSachHtml(duLieu.gioiThieu.doanVan)}</p>` : ''}
                </div>
                ${
                  cacDiem.length
                    ? `<div>
                        <h3 class="tieu-de-nho">Điểm nổi bật</h3>
                        <ul style="list-style:none;padding:0;margin:8px 0 0 0;display:flex;flex-direction:column;gap:8px;">
                          ${cacDiem.map((d) => `<li style="padding-bottom:8px;border-bottom:1px solid var(--mau-vien);font-weight:500;">— ${lamSachHtml(d)}</li>`).join('')}
                        </ul>
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
      layCssNenChung(bangMau, tapChiBienTap.fontChu.tieuDe, tapChiBienTap.fontChu.noiDung) +
      cssRieng;

    return bocKhungTaiLieuHtml({
      duLieu,
      fontTieuDe: tapChiBienTap.fontChu.tieuDe,
      fontNoiDung: tapChiBienTap.fontChu.noiDung,
      cssTongHop,
      noiDungBody,
    });
  },
};
