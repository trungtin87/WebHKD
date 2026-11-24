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

// Theme 2: Tối giản sáng — Thanh lịch, nhiều khoảng trắng, chữ giữa và ảnh lớn xen kẽ
export const toiGianSang: ThemeGiaoDien = {
  ma: 'toiGianSang',
  ten: 'Tối giản sáng',
  moTaNgan: 'Thanh lịch, nhiều khoảng trắng, đầu trang chữ căn giữa và sản phẩm ảnh lớn xen kẽ.',
  phongCach: 'Hiện đại · Thời trang & Mỹ phẩm',
  nganhPhuHop: ['thoiTrang', 'myPham'],
  bangMau: {
    nen: '#FFFFFF',
    beMat: '#F8F7F4',
    chinh: '#18181B',
    nhan: '#9A5B3A',
    chu: '#18181B',
    chuPhu: '#52525B',
    vien: '#E4E4E7',
  },
  mauGoiY: ['#18181B', '#9A5B3A', '#7C2D12', '#3F6212', '#4C1D95'],
  fontChu: {
    tieuDe: 'Playfair Display',
    noiDung: 'Plus Jakarta Sans',
  },
  kieuDauTrang: 'chuGiuaNenMau',
  kieuSanPham: 'anhLonXenKe',
  hoaTiet: 'toiGian',
  veTrang: (duLieu: DuLieuCuaHang, tuyChon: TuyChonVeTrang): string => {
    const bangMau = {
      ...toiGianSang.bangMau,
      chinh: tuyChon.mauChinhTuyChon || duLieu.giaoDien.mauChinh || toiGianSang.bangMau.chinh,
    };
    const lh = layThongTinLienHe(duLieu);
    const anhBanner = layNguonAnh(duLieu.anhBanner, 'anhBanner', tuyChon);

    const cssRieng = `
      .tg-dau-trang {
        border-bottom: 1px solid var(--mau-vien);
        padding: 12px 0;
        background-color: var(--mau-nen);
      }
      .tg-dau-khung {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 16px;
      }
      .tg-logo-cum {
        display: flex;
        align-items: center;
        gap: 10px;
        min-width: 0;
      }
      .tg-ten-nho {
        font-family: var(--font-tieu-de);
        font-weight: 700;
        font-size: 1.12rem;
        margin: 0;
        overflow-wrap: anywhere;
      }
      .tg-banner {
        background-color: var(--mau-be-mat);
        border-bottom: 1px solid var(--mau-vien);
        padding: 32px 0;
        text-align: center;
      }
      .tg-tieu-de-chinh {
        font-family: var(--font-tieu-de);
        font-size: clamp(1.85rem, 4.2vw, 3rem);
        font-weight: 700;
        line-height: 1.2;
        margin: 0 auto 10px auto;
        max-width: 760px;
        color: var(--mau-chu);
        text-wrap: balance;
      }
      .tg-khau-hieu {
        margin: 0 auto 18px auto;
        max-width: 560px;
        color: var(--mau-chu-phu);
        font-size: 0.98rem;
      }
      .tg-khung-anh-banner {
        margin: 22px auto 0 auto;
        max-width: 960px;
        border-radius: 14px;
        overflow: hidden;
        border: 1px solid var(--mau-vien);
      }
      .tg-khung-anh-banner img {
        width: 100%;
        max-height: 380px;
        object-fit: cover;
      }
      .tg-danh-sach-xen-ke {
        display: flex;
        flex-direction: column;
        gap: 18px;
      }
      .tg-dong-sp {
        display: grid;
        grid-template-columns: 1fr;
        gap: 16px;
        align-items: center;
        padding: 16px;
        background-color: var(--mau-be-mat);
        border: 1px solid var(--mau-vien);
        border-radius: 14px;
      }
      .tg-sp-anh-khung img {
        width: 100%;
        aspect-ratio: 4 / 3;
        object-fit: cover;
        border-radius: 10px;
      }
      .tg-sp-thong-tin {
        display: flex;
        flex-direction: column;
        gap: 6px;
      }
      .tg-sp-ten {
        font-family: var(--font-tieu-de);
        font-size: 1.28rem;
        margin: 0;
        line-height: 1.3;
        overflow-wrap: anywhere;
      }
      .tg-sp-mo-ta {
        margin: 0;
        color: var(--mau-chu-phu);
        font-size: 0.92rem;
        overflow-wrap: anywhere;
      }
      .tg-gioi-thieu-chu {
        max-width: 740px;
        margin: 0 auto;
        text-align: center;
      }
      .tg-diem-hang {
        margin-top: 14px;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 8px 18px;
        color: var(--mau-chinh);
        font-weight: 600;
        font-size: 0.9rem;
      }
      @media (min-width: 768px) {
        .tg-banner { padding: 48px 0; }
        .tg-danh-sach-xen-ke { gap: 24px; }
        .tg-dong-sp.co-anh {
          grid-template-columns: 1fr 1fr;
          gap: 32px;
          padding: 24px;
        }
        .tg-dong-sp.co-anh.dao-chieu .tg-sp-anh-khung { order: 2; }
        .tg-dong-sp.co-anh.dao-chieu .tg-sp-thong-tin { order: 1; }
      }
    `;

    const veKhoi: Record<MaKhoiHienThi, () => string> = {
      dauTrang: () => `
        <header class="tg-dau-trang">
          <div class="khung-noi-dung tg-dau-khung">
            <div class="tg-logo-cum">
              <span class="tg-ten-nho">${lamSachHtml(duLieu.tenCuaHang || 'Tên cửa hàng')}</span>
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
        <section class="tg-banner">
          <div class="khung-noi-dung">
            <h1 class="tg-tieu-de-chinh">${lamSachHtml(duLieu.tenCuaHang || 'Cửa hàng')}</h1>
            ${
              duLieu.khauHieu.trim()
                ? `<p class="tg-khau-hieu">${lamSachHtml(duLieu.khauHieu)}</p>`
                : ''
            }
            <div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap;">
              ${
                lh.soZaloSach
                  ? `<a class="nut-chinh" href="${lamSachHtml(lh.linkZalo)}" target="_blank" rel="noopener noreferrer">Nhắn Zalo xem mẫu</a>`
                  : ''
              }
              ${
                lh.soGoiSach
                  ? `<a class="nut-phu" href="${lamSachHtml(lh.linkGoi)}">Gọi ${lamSachHtml(lh.soGoiHienThi)}</a>`
                  : ''
              }
            </div>
            ${
              anhBanner
                ? `<div class="tg-khung-anh-banner">
                    <img src="${lamSachHtml(anhBanner)}" alt="Ảnh bìa ${lamSachHtml(duLieu.tenCuaHang)}" />
                  </div>`
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
              <h2 class="tieu-de-khoi" style="text-align:center;margin-bottom:28px;">Sản phẩm nổi bật &amp; Bảng giá</h2>
              <div class="tg-danh-sach-xen-ke">
                ${duLieu.danhSachSanPham
                  .map((sp, idx) => {
                    const anhSp = layNguonAnh(sp.anh, `sp_${idx}`, tuyChon);
                    const { chuGia, laGiaCuThe } = taoNhanGiaSanPham(sp);
                    const daoChieu = idx % 2 === 1 ? 'dao-chieu' : '';
                    return `
                      <article class="tg-dong-sp ${anhSp ? 'co-anh' : ''} ${daoChieu}">
                        ${
                          anhSp
                            ? `<div class="tg-sp-anh-khung">
                                <img src="${lamSachHtml(anhSp)}" alt="${lamSachHtml(sp.ten)}" />
                              </div>`
                            : ''
                        }
                        <div class="tg-sp-thong-tin">
                          ${sp.noiBat ? `<span class="nhan-noi-bat">Được chọn nhiều</span>` : ''}
                          <h3 class="tg-sp-ten">${lamSachHtml(sp.ten)}</h3>
                          <div class="${laGiaCuThe ? 'gia-san-pham' : 'gia-tu-van'}">${chuGia}</div>
                          ${sp.moTa.trim() ? `<p class="tg-sp-mo-ta">${lamSachHtml(sp.moTa)}</p>` : ''}
                          ${
                            lh.soZaloSach
                              ? `<div style="margin-top:8px;">
                                  <a class="nut-phu" href="${lamSachHtml(lh.linkZalo)}" target="_blank" rel="noopener noreferrer">Nhắn Zalo hỏi chi tiết</a>
                                </div>`
                              : ''
                          }
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
          <section class="khoi-chung" style="background-color:var(--mau-be-mat);border-top:1px solid var(--mau-vien);border-bottom:1px solid var(--mau-vien);">
            <div class="khung-noi-dung tg-gioi-thieu-chu">
              <h2 class="tieu-de-khoi">Cam kết cửa hàng</h2>
              ${coDoanVan ? `<p style="margin:0;color:var(--mau-chu-phu);line-height:1.75;">${lamSachHtml(duLieu.gioiThieu.doanVan)}</p>` : ''}
              ${
                cacDiem.length
                  ? `<div class="tg-diem-hang">
                      ${cacDiem.map((diem) => `<span>· ${lamSachHtml(diem)}</span>`).join('')}
                    </div>`
                  : ''
              }
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
      layCssNenChung(bangMau, toiGianSang.fontChu.tieuDe, toiGianSang.fontChu.noiDung) + cssRieng;

    return bocKhungTaiLieuHtml({
      duLieu,
      fontTieuDe: toiGianSang.fontChu.tieuDe,
      fontNoiDung: toiGianSang.fontChu.noiDung,
      cssTongHop,
      noiDungBody,
    });
  },
};
