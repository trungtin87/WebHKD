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

// Theme 1: Nông sản xanh lá — Ấm áp, gần gũi như bảng hiệu quán ăn & nông sản quê Việt
export const nongSanXanhLa: ThemeGiaoDien = {
  ma: 'nongSanXanhLa',
  ten: 'Nông sản xanh lá',
  moTaNgan: 'Ấm áp, gần gũi với họa tiết lá chuối, tiêu đề chữ viết tay và lưới thẻ sản phẩm rõ giá.',
  phongCach: 'Truyền thống · Chợ quê & Ẩm thực',
  nganhPhuHop: ['nongSan', 'amThuc'],
  bangMau: {
    nen: '#FFFDF5',
    beMat: '#FFFFFF',
    chinh: '#2E7D32',
    nhan: '#C62828',
    chu: '#2B251F',
    chuPhu: '#5C5346',
    vien: '#E5DEC9',
  },
  mauGoiY: ['#2E7D32', '#1B5E20', '#558B2F', '#00695C', '#B45309'],
  fontChu: {
    tieuDe: 'Pacifico',
    noiDung: 'Nunito',
  },
  kieuDauTrang: 'bannerAnhLon',
  kieuSanPham: 'luoiThe',
  hoaTiet: 'laCay',
  veTrang: (duLieu: DuLieuCuaHang, tuyChon: TuyChonVeTrang): string => {
    const bangMau = {
      ...nongSanXanhLa.bangMau,
      chinh: tuyChon.mauChinhTuyChon || duLieu.giaoDien.mauChinh || nongSanXanhLa.bangMau.chinh,
    };
    const lh = layThongTinLienHe(duLieu);
    const anhBanner = layNguonAnh(duLieu.anhBanner, 'anhBanner', tuyChon);
    const hoaTiet = taoHoaTietNenCss('laCay', bangMau.chinh);

    const cssRieng = `
      .ns-dau-trang {
        background-color: var(--mau-be-mat);
        border-bottom: 1px solid var(--mau-vien);
        padding: 10px 0;
      }
      .ns-thanh-thuong-hieu {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 16px;
      }
      .ns-cum-ten {
        display: flex;
        align-items: center;
        gap: 10px;
        min-width: 0;
        flex: 1;
      }
      .ns-ten-ch {
        margin: 0;
        font-family: var(--font-tieu-de);
        font-size: clamp(1.15rem, 2.5vw, 1.55rem);
        color: var(--mau-chinh);
        line-height: 1.3;
        overflow-wrap: anywhere;
      }
      .ns-khu-vuc-nhanh {
        font-size: 0.78rem;
        color: var(--mau-chu-phu);
        margin: 2px 0 0 0;
        overflow-wrap: anywhere;
      }
      .ns-banner {
        position: relative;
        background-color: var(--mau-chinh);
        background-image: ${hoaTiet};
        color: #FFFFFF;
        overflow: hidden;
      }
      .ns-banner-anh {
        width: 100%;
        height: 220px;
        object-fit: cover;
        opacity: 0.36;
      }
      .ns-banner-noi-dung {
        padding: 28px 16px;
        text-align: center;
      }
      .ns-banner.co-anh .ns-banner-noi-dung {
        position: absolute;
        inset: 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background: linear-gradient(180deg, rgba(20, 42, 22, 0.55), rgba(20, 42, 22, 0.8));
        padding: 20px 16px;
      }
      .ns-banner-tieu-de {
        font-family: var(--font-tieu-de);
        font-size: clamp(1.6rem, 4.2vw, 2.65rem);
        margin: 0 0 8px 0;
        line-height: 1.3;
        text-wrap: balance;
      }
      .ns-banner-khau-hieu {
        margin: 0 auto 16px auto;
        max-width: 600px;
        font-size: 0.96rem;
        opacity: 0.96;
      }
      .ns-banner-nut {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        justify-content: center;
      }
      .ns-banner .nut-chinh {
        background-color: #FFFFFF;
        color: var(--mau-chinh);
        border-color: #FFFFFF;
      }
      .ns-luoi-sp {
        display: grid;
        grid-template-columns: 1fr;
        gap: 14px;
      }
      .ns-the-sp {
        background-color: var(--mau-be-mat);
        border: 1px solid var(--mau-vien);
        border-radius: 14px;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        height: 100%;
      }
      .ns-the-sp.noi-bat {
        border-color: var(--mau-chinh);
        box-shadow: 0 4px 12px rgba(46, 125, 50, 0.08);
      }
      .ns-sp-anh {
        width: 100%;
        aspect-ratio: 4 / 3;
        object-fit: cover;
        background-color: #F3EFE0;
      }
      .ns-sp-than {
        padding: 14px;
        display: flex;
        flex-direction: column;
        flex: 1;
      }
      .ns-sp-ten {
        margin: 0 0 4px 0;
        font-size: 1.04rem;
        font-weight: 700;
        line-height: 1.35;
        overflow-wrap: anywhere;
      }
      .ns-sp-mo-ta {
        margin: 6px 0 10px 0;
        font-size: 0.88rem;
        color: var(--mau-chu-phu);
        flex: 1;
        overflow-wrap: anywhere;
      }
      .ns-gioi-thieu-khung {
        background-color: var(--mau-be-mat);
        border: 1px solid var(--mau-vien);
        border-radius: 14px;
        padding: 18px;
        background-image: ${hoaTiet};
      }
      .ns-doan-gt {
        margin: 0 0 14px 0;
        font-size: 0.96rem;
        line-height: 1.65;
        overflow-wrap: anywhere;
      }
      .ns-diem-list {
        list-style: none;
        padding: 0;
        margin: 0;
        display: grid;
        grid-template-columns: 1fr;
        gap: 8px;
      }
      .ns-diem-item {
        background-color: var(--mau-nen);
        border: 1px solid var(--mau-vien);
        border-radius: 10px;
        padding: 9px 12px;
        font-weight: 600;
        font-size: 0.9rem;
        color: var(--mau-chinh);
      }
      @media (min-width: 600px) {
        .ns-luoi-sp { grid-template-columns: repeat(2, 1fr); gap: 16px; }
        .ns-diem-list { grid-template-columns: repeat(2, 1fr); }
      }
      @media (min-width: 960px) {
        .ns-banner-anh { height: 320px; }
        .ns-banner-noi-dung { padding: 48px 24px; }
        .ns-luoi-sp { grid-template-columns: repeat(3, 1fr); gap: 20px; }
        .ns-gioi-thieu-khung { padding: 26px; }
      }
    `;

    const veKhoi: Record<MaKhoiHienThi, () => string> = {
      dauTrang: () => `
        <header class="ns-dau-trang">
          <div class="khung-noi-dung ns-thanh-thuong-hieu">
            <div class="ns-cum-ten">
              <div>
                <h1 class="ns-ten-ch">${lamSachHtml(duLieu.tenCuaHang || 'Tên cửa hàng')}</h1>
                ${
                  duLieu.hoKinhDoanh.khuVucPhucVu.trim()
                    ? `<p class="ns-khu-vuc-nhanh">${lamSachHtml(duLieu.hoKinhDoanh.khuVucPhucVu)}</p>`
                    : ''
                }
              </div>
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
        <section class="ns-banner ${anhBanner ? 'co-anh' : ''}">
          ${
            anhBanner
              ? `<img class="ns-banner-anh" src="${lamSachHtml(anhBanner)}" alt="Ảnh bìa ${lamSachHtml(duLieu.tenCuaHang)}" />`
              : ''
          }
          <div class="khung-noi-dung ns-banner-noi-dung">
            <h2 class="ns-banner-tieu-de">${lamSachHtml(duLieu.tenCuaHang || 'Chào mừng quý khách')}</h2>
            ${
              duLieu.khauHieu.trim()
                ? `<p class="ns-banner-khau-hieu">${lamSachHtml(duLieu.khauHieu)}</p>`
                : ''
            }
            <div class="ns-banner-nut">
              ${
                lh.soZaloSach
                  ? `<a class="nut-chinh" href="${lamSachHtml(lh.linkZalo)}" target="_blank" rel="noopener noreferrer">Nhắn Zalo đặt hàng</a>`
                  : ''
              }
              ${
                lh.soGoiSach
                  ? `<a class="nut-goi" href="${lamSachHtml(lh.linkGoi)}">Gọi ${lamSachHtml(lh.soGoiHienThi)}</a>`
                  : ''
              }
            </div>
          </div>
        </section>
      `,
      sanPham: () => {
        if (!duLieu.danhSachSanPham.length) return '';
        return `
          <section class="khoi-chung" id="san-pham">
            <div class="khung-noi-dung">
              <h2 class="tieu-de-khoi">Bảng giá &amp; Sản phẩm tại cửa hàng</h2>
              <div class="ns-luoi-sp">
                ${duLieu.danhSachSanPham
                  .map((sp, idx) => {
                    const anhSp = layNguonAnh(sp.anh, `sp_${idx}`, tuyChon);
                    const { chuGia, laGiaCuThe } = taoNhanGiaSanPham(sp);
                    return `
                      <article class="ns-the-sp ${sp.noiBat ? 'noi-bat' : ''}">
                        ${
                          anhSp
                            ? `<img class="ns-sp-anh" src="${lamSachHtml(anhSp)}" alt="${lamSachHtml(sp.ten)}" />`
                            : ''
                        }
                        <div class="ns-sp-than">
                          ${sp.noiBat ? `<span class="nhan-noi-bat">Món bán chạy</span>` : ''}
                          <h3 class="ns-sp-ten">${lamSachHtml(sp.ten)}</h3>
                          <div class="${laGiaCuThe ? 'gia-san-pham' : 'gia-tu-van'}">${chuGia}</div>
                          ${sp.moTa.trim() ? `<p class="ns-sp-mo-ta">${lamSachHtml(sp.moTa)}</p>` : '<div style="flex:1"></div>'}
                          ${
                            lh.soZaloSach
                              ? `<a class="nut-zalo-sp" href="${lamSachHtml(lh.linkZalo)}" target="_blank" rel="noopener noreferrer">Hỏi mua qua Zalo</a>`
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
          <section class="khoi-chung" id="gioi-thieu">
            <div class="khung-noi-dung">
              <div class="ns-gioi-thieu-khung">
                <h2 class="tieu-de-khoi">Về ${lamSachHtml(duLieu.tenCuaHang || 'chúng tôi')}</h2>
                ${coDoanVan ? `<p class="ns-doan-gt">${lamSachHtml(duLieu.gioiThieu.doanVan)}</p>` : ''}
                ${
                  cacDiem.length
                    ? `<ul class="ns-diem-list">
                        ${cacDiem.map((diem) => `<li class="ns-diem-item">${lamSachHtml(diem)}</li>`).join('')}
                      </ul>`
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
      layCssNenChung(bangMau, nongSanXanhLa.fontChu.tieuDe, nongSanXanhLa.fontChu.noiDung) + cssRieng;

    return bocKhungTaiLieuHtml({
      duLieu,
      fontTieuDe: nongSanXanhLa.fontChu.tieuDe,
      fontNoiDung: nongSanXanhLa.fontChu.noiDung,
      cssTongHop,
      noiDungBody,
    });
  },
};
