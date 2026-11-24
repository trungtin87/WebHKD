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

// Theme 6: Bento Hiện Đại — Cảm hứng Webflow Bento Grid mô-đun gọn gàng, sản phẩm nổi bật chiếm ô lớn
export const bentoHienDai: ThemeGiaoDien = {
  ma: 'bentoHienDai',
  ten: 'Bento hiện đại',
  moTaNgan: 'Bố cục ô vuông Bento chuẩn Webflow, khối thông tin mạch lạc và làm nổi bật món bán chạy.',
  phongCach: 'Webflow Bento · Hiện đại & Gọn gàng',
  nganhPhuHop: ['thoiTrang', 'myPham', 'dichVu', 'khac'],
  bangMau: {
    nen: '#F3F4F6',
    beMat: '#FFFFFF',
    chinh: '#0D9488',
    nhan: '#111827',
    chu: '#111827',
    chuPhu: '#4B5563',
    vien: '#E5E7EB',
  },
  mauGoiY: ['#0D9488', '#2563EB', '#4F46E5', '#059669', '#D97706'],
  fontChu: {
    tieuDe: 'Bricolage Grotesque',
    noiDung: 'Plus Jakarta Sans',
  },
  kieuDauTrang: 'chiaDoiTraiPhai',
  kieuSanPham: 'luoiThe',
  hoaTiet: 'luoiBento',
  veTrang: (duLieu: DuLieuCuaHang, tuyChon: TuyChonVeTrang): string => {
    const bangMau = {
      ...bentoHienDai.bangMau,
      chinh: tuyChon.mauChinhTuyChon || duLieu.giaoDien.mauChinh || bentoHienDai.bangMau.chinh,
    };
    const lh = layThongTinLienHe(duLieu);
    const anhBanner = layNguonAnh(duLieu.anhBanner, 'anhBanner', tuyChon);
    const hoaTiet = taoHoaTietNenCss('luoiBento', bangMau.chinh);

    const cssRieng = `
      body { background-image: ${hoaTiet}; }
      .bt-dau-trang {
        background-color: rgba(255, 255, 255, 0.94);
        backdrop-filter: blur(8px);
        border-bottom: 1px solid var(--mau-vien);
        padding: 10px 0;
      }
      .bt-thanh-tren {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 16px;
      }
      .bt-cum-ten {
        display: flex;
        align-items: center;
        gap: 10px;
        min-width: 0;
      }
      .bt-ten-ch {
        margin: 0;
        font-family: var(--font-tieu-de);
        font-size: 1.15rem;
        font-weight: 700;
        overflow-wrap: anywhere;
      }
      .bt-hero-bento {
        padding-top: 20px;
      }
      .bt-bento-luoi {
        display: grid;
        grid-template-columns: 1fr;
        gap: 12px;
      }
      .bt-o-chinh {
        background-color: var(--mau-be-mat);
        border: 1px solid var(--mau-vien);
        border-radius: 18px;
        padding: 20px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        gap: 14px;
      }
      .bt-tieu-de-lon {
        font-family: var(--font-tieu-de);
        font-size: clamp(1.65rem, 3.8vw, 2.55rem);
        font-weight: 700;
        line-height: 1.18;
        margin: 0;
        text-wrap: balance;
      }
      .bt-khau-hieu {
        margin: 0;
        color: var(--mau-chu-phu);
        font-size: 0.96rem;
      }
      .bt-o-anh {
        background-color: var(--mau-be-mat);
        border: 1px solid var(--mau-vien);
        border-radius: 18px;
        overflow: hidden;
        min-height: 200px;
      }
      .bt-o-anh img {
        width: 100%;
        height: 100%;
        min-height: 200px;
        max-height: 320px;
        object-fit: cover;
      }
      .bt-o-thong-so {
        display: grid;
        grid-template-columns: 1fr;
        gap: 12px;
      }
      .bt-o-phu {
        background-color: var(--mau-be-mat);
        border: 1px solid var(--mau-vien);
        border-radius: 16px;
        padding: 14px 16px;
      }
      .bt-luoi-sp {
        display: grid;
        grid-template-columns: 1fr;
        gap: 14px;
      }
      .bt-the-sp {
        background-color: var(--mau-be-mat);
        border: 1px solid var(--mau-vien);
        border-radius: 16px;
        padding: 14px;
        display: flex;
        flex-direction: column;
        height: 100%;
      }
      .bt-the-sp.noi-bat {
        border-color: var(--mau-chinh);
      }
      .bt-the-sp img {
        width: 100%;
        aspect-ratio: 4 / 3;
        object-fit: cover;
        border-radius: 12px;
        margin-bottom: 12px;
      }
      .bt-sp-ten {
        margin: 0 0 4px 0;
        font-family: var(--font-tieu-de);
        font-size: 1.12rem;
        font-weight: 700;
        overflow-wrap: anywhere;
      }
      .bt-sp-mo-ta {
        margin: 6px 0 12px 0;
        font-size: 0.88rem;
        color: var(--mau-chu-phu);
        flex: 1;
        overflow-wrap: anywhere;
      }
      @media (min-width: 768px) {
        .bt-hero-bento { padding-top: 28px; }
        .bt-bento-luoi { grid-template-columns: 1.15fr 0.85fr; gap: 16px; }
        .bt-o-chinh { padding: 30px; }
        .bt-o-thong-so { grid-template-columns: repeat(2, 1fr); grid-column: 1 / -1; }
        .bt-luoi-sp { grid-template-columns: repeat(3, 1fr); gap: 16px; }
        .bt-the-sp.noi-bat-rong { grid-column: span 2; }
        .bt-the-sp.noi-bat-rong img { aspect-ratio: 16 / 9; }
      }
    `;

    const veKhoi: Record<MaKhoiHienThi, () => string> = {
      dauTrang: () => `
        <header class="bt-dau-trang">
          <div class="khung-noi-dung bt-thanh-tren">
            <div class="bt-cum-ten">
              <span class="bt-ten-ch">${lamSachHtml(duLieu.tenCuaHang || 'Cửa hàng')}</span>
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
      banner: () => {
        const coGioHoacKhuVuc =
          duLieu.gioMoCua.trim() || duLieu.hoKinhDoanh.khuVucPhucVu.trim();
        return `
          <section class="bt-hero-bento">
            <div class="khung-noi-dung">
              <div class="bt-bento-luoi">
                <div class="bt-o-chinh" ${!anhBanner ? 'style="grid-column: 1 / -1;"' : ''}>
                  <div>
                    <h1 class="bt-tieu-de-lon">${lamSachHtml(duLieu.tenCuaHang || 'Tên cửa hàng')}</h1>
                    ${duLieu.khauHieu.trim() ? `<p class="bt-khau-hieu" style="margin-top:10px;">${lamSachHtml(duLieu.khauHieu)}</p>` : ''}
                  </div>
                  <div style="display:flex;flex-wrap:wrap;gap:10px;">
                    ${lh.soZaloSach ? `<a class="nut-chinh" href="${lamSachHtml(lh.linkZalo)}" target="_blank" rel="noopener noreferrer">Nhắn Zalo: ${lamSachHtml(lh.soZaloHienThi)}</a>` : ''}
                    ${lh.soGoiSach ? `<a class="nut-phu" href="${lamSachHtml(lh.linkGoi)}">Gọi điện</a>` : ''}
                  </div>
                </div>
                ${
                  anhBanner
                    ? `<div class="bt-o-anh"><img src="${lamSachHtml(anhBanner)}" alt="Ảnh bìa ${lamSachHtml(duLieu.tenCuaHang)}" /></div>`
                    : ''
                }
                ${
                  coGioHoacKhuVuc
                    ? `<div class="bt-o-thong-so">
                        ${
                          duLieu.hoKinhDoanh.khuVucPhucVu.trim()
                            ? `<div class="bt-o-phu">
                                <span class="nhan-nho">Khu vực phục vụ</span>
                                <div style="font-weight:600;font-size:0.92rem;">${lamSachHtml(duLieu.hoKinhDoanh.khuVucPhucVu)}</div>
                              </div>`
                            : ''
                        }
                        ${
                          duLieu.gioMoCua.trim()
                            ? `<div class="bt-o-phu">
                                <span class="nhan-nho">Giờ mở cửa</span>
                                <div style="font-weight:600;font-size:0.92rem;">${lamSachHtml(duLieu.gioMoCua)}</div>
                              </div>`
                            : ''
                        }
                      </div>`
                    : ''
                }
              </div>
            </div>
          </section>
        `;
      },
      sanPham: () => {
        if (!duLieu.danhSachSanPham.length) return '';
        return `
          <section class="khoi-chung" id="san-pham">
            <div class="khung-noi-dung">
              <h2 class="tieu-de-khoi">Bảng giá &amp; Sản phẩm</h2>
              <div class="bt-luoi-sp">
                ${duLieu.danhSachSanPham
                  .map((sp, idx) => {
                    const anhSp = layNguonAnh(sp.anh, `sp_${idx}`, tuyChon);
                    const { chuGia, laGiaCuThe } = taoNhanGiaSanPham(sp);
                    const moRong = idx === 0 && sp.noiBat && duLieu.danhSachSanPham.length >= 3;
                    return `
                      <article class="bt-the-sp ${sp.noiBat ? 'noi-bat' : ''} ${moRong ? 'noi-bat-rong' : ''}">
                        ${anhSp ? `<img src="${lamSachHtml(anhSp)}" alt="${lamSachHtml(sp.ten)}" />` : ''}
                        ${sp.noiBat ? `<span class="nhan-noi-bat">Bán chạy nhất</span>` : ''}
                        <h3 class="bt-sp-ten">${lamSachHtml(sp.ten)}</h3>
                        <div class="${laGiaCuThe ? 'gia-san-pham' : 'gia-tu-van'}">${chuGia}</div>
                        ${sp.moTa.trim() ? `<p class="bt-sp-mo-ta">${lamSachHtml(sp.moTa)}</p>` : '<div style="flex:1"></div>'}
                        ${
                          lh.soZaloSach
                            ? `<a class="nut-zalo-sp" href="${lamSachHtml(lh.linkZalo)}" target="_blank" rel="noopener noreferrer">Hỏi mua qua Zalo</a>`
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
              <div class="bt-o-chinh">
                <h2 class="tieu-de-khoi" style="margin-bottom:4px;">Giới thiệu cửa hàng</h2>
                ${coDoanVan ? `<p style="margin:0;color:var(--mau-chu-phu);">${lamSachHtml(duLieu.gioiThieu.doanVan)}</p>` : ''}
                ${
                  cacDiem.length
                    ? `<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:10px;padding-top:10px;border-top:1px solid var(--mau-vien);">
                        ${cacDiem.map((d) => `<div style="font-weight:600;font-size:0.9rem;color:var(--mau-chinh);">✓ ${lamSachHtml(d)}</div>`).join('')}
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
      layCssNenChung(bangMau, bentoHienDai.fontChu.tieuDe, bentoHienDai.fontChu.noiDung) + cssRieng;

    return bocKhungTaiLieuHtml({
      duLieu,
      fontTieuDe: bentoHienDai.fontChu.tieuDe,
      fontNoiDung: bentoHienDai.fontChu.noiDung,
      cssTongHop,
      noiDungBody,
    });
  },
};
