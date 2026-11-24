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

// Theme 4: Thủ công màu đất — Mộc mạc, họa tiết cổ truyền Việt Nam, trình bày menu dọc
export const thuCongMauDat: ThemeGiaoDien = {
  ma: 'thuCongMauDat',
  ten: 'Thủ công màu đất',
  moTaNgan: 'Mộc mạc với sắc giấy dó và gốm đất nung, họa tiết cổ truyền và thực đơn dọc trang trọng.',
  phongCach: 'Truyền thống · Làng nghề & Quà biếu',
  nganhPhuHop: ['thuCong', 'amThuc', 'nongSan'],
  bangMau: {
    nen: '#F7F1E5',
    beMat: '#FFFDF8',
    chinh: '#7C3A1D',
    nhan: '#B45309',
    chu: '#2D2016',
    chuPhu: '#665445',
    vien: '#DECDB7',
  },
  mauGoiY: ['#7C3A1D', '#92400E', '#7F1D1D', '#3F6212', '#44403C'],
  fontChu: {
    tieuDe: 'Playfair Display',
    noiDung: 'Lora',
  },
  kieuDauTrang: 'chuGiuaNenMau',
  kieuSanPham: 'menuDoc',
  hoaTiet: 'hoaVanCoTruyen',
  veTrang: (duLieu: DuLieuCuaHang, tuyChon: TuyChonVeTrang): string => {
    const bangMau = {
      ...thuCongMauDat.bangMau,
      chinh: tuyChon.mauChinhTuyChon || duLieu.giaoDien.mauChinh || thuCongMauDat.bangMau.chinh,
    };
    const lh = layThongTinLienHe(duLieu);
    const anhBanner = layNguonAnh(duLieu.anhBanner, 'anhBanner', tuyChon);
    const hoaTiet = taoHoaTietNenCss('hoaVanCoTruyen', bangMau.chinh);

    const cssRieng = `
      .tc-dau-trang {
        background-color: var(--mau-chinh);
        background-image: ${hoaTiet};
        color: #FFFDF8;
        padding: 22px 0;
        text-align: center;
        border-bottom: 3px solid var(--mau-nhan);
      }
      .tc-thanh-tren {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;
      }
      .tc-ten-ch {
        font-family: var(--font-tieu-de);
        font-size: clamp(1.55rem, 4vw, 2.5rem);
        margin: 0;
        line-height: 1.25;
        text-wrap: balance;
      }
      .tc-khau-hieu {
        margin: 0 auto;
        max-width: 580px;
        opacity: 0.94;
        font-size: 0.95rem;
      }
      .tc-banner-khung {
        padding: 20px 0 0 0;
      }
      .tc-banner-anh {
        width: 100%;
        max-height: 320px;
        object-fit: cover;
        border-radius: 12px;
        border: 1px solid var(--mau-vien);
      }
      .tc-menu-hop {
        background-color: var(--mau-be-mat);
        border: 1px solid var(--mau-vien);
        border-radius: 14px;
        padding: 16px;
      }
      .tc-menu-muc {
        display: flex;
        gap: 12px;
        padding: 14px 0;
        border-bottom: 1px dashed var(--mau-vien);
        align-items: flex-start;
      }
      .tc-menu-muc:first-child { padding-top: 4px; }
      .tc-menu-muc:last-child { border-bottom: none; padding-bottom: 4px; }
      .tc-menu-anh {
        width: 76px;
        height: 76px;
        border-radius: 10px;
        object-fit: cover;
        flex-shrink: 0;
        border: 1px solid var(--mau-vien);
      }
      .tc-menu-than {
        flex: 1;
        min-width: 0;
      }
      .tc-menu-dong-dau {
        display: flex;
        flex-direction: column;
        gap: 4px;
        margin-bottom: 4px;
      }
      .tc-menu-ten {
        margin: 0;
        font-family: var(--font-tieu-de);
        font-size: 1.12rem;
        font-weight: 700;
        overflow-wrap: anywhere;
      }
      .tc-menu-mo-ta {
        margin: 4px 0 8px 0;
        font-size: 0.9rem;
        color: var(--mau-chu-phu);
        overflow-wrap: anywhere;
      }
      .tc-menu-zalo {
        font-size: 0.86rem;
        font-weight: 700;
        color: var(--mau-chinh);
        text-decoration: underline;
        text-underline-offset: 3px;
      }
      .tc-gioi-thieu-khung {
        background-color: var(--mau-be-mat);
        border: 1px solid var(--mau-vien);
        border-radius: 14px;
        padding: 18px;
      }
      .tc-diem-chip {
        display: flex;
        flex-wrap: wrap;
        gap: 8px 16px;
        margin-top: 12px;
        padding-top: 12px;
        border-top: 1px solid var(--mau-vien);
        font-weight: 600;
        color: var(--mau-chinh);
        font-size: 0.9rem;
      }
      @media (min-width: 768px) {
        .tc-dau-trang { padding: 30px 0; }
        .tc-menu-hop { padding: 24px 28px; }
        .tc-menu-dong-dau {
          flex-direction: row;
          justify-content: space-between;
          align-items: baseline;
          gap: 16px;
        }
        .tc-menu-anh { width: 92px; height: 92px; }
        .tc-gioi-thieu-khung { padding: 26px; }
      }
    `;

    const veKhoi: Record<MaKhoiHienThi, () => string> = {
      dauTrang: () => `
        <header class="tc-dau-trang">
          <div class="khung-noi-dung tc-thanh-tren">
            <h1 class="tc-ten-ch">${lamSachHtml(duLieu.tenCuaHang || 'Tên cửa hàng')}</h1>
            ${duLieu.khauHieu.trim() ? `<p class="tc-khau-hieu">${lamSachHtml(duLieu.khauHieu)}</p>` : ''}
            ${veDieuHuongNhanh(duLieu)}
          </div>
        </header>
      `,
      banner: () => {
        if (!anhBanner) return '';
        return `
          <section class="tc-banner-khung">
            <div class="khung-noi-dung">
              <img class="tc-banner-anh" src="${lamSachHtml(anhBanner)}" alt="Ảnh bìa ${lamSachHtml(duLieu.tenCuaHang)}" />
            </div>
          </section>
        `;
      },
      sanPham: () => {
        if (!duLieu.danhSachSanPham.length) return '';
        return `
          <section class="khoi-chung" id="san-pham">
            <div class="khung-noi-dung">
              <h2 class="tieu-de-khoi">Danh mục sản phẩm &amp; Giá niêm yết</h2>
              <div class="tc-menu-hop">
                ${duLieu.danhSachSanPham
                  .map((sp, idx) => {
                    const anhSp = layNguonAnh(sp.anh, `sp_${idx}`, tuyChon);
                    const { chuGia, laGiaCuThe } = taoNhanGiaSanPham(sp);
                    return `
                      <article class="tc-menu-muc">
                        ${
                          anhSp
                            ? `<img class="tc-menu-anh" src="${lamSachHtml(anhSp)}" alt="${lamSachHtml(sp.ten)}" />`
                            : ''
                        }
                        <div class="tc-menu-than">
                          ${sp.noiBat ? `<span class="nhan-noi-bat">Đặc sản nổi bật</span>` : ''}
                          <div class="tc-menu-dong-dau">
                            <h3 class="tc-menu-ten">${lamSachHtml(sp.ten)}</h3>
                            <span class="${laGiaCuThe ? 'gia-san-pham' : 'gia-tu-van'}" style="white-space:nowrap;">${chuGia}</span>
                          </div>
                          ${sp.moTa.trim() ? `<p class="tc-menu-mo-ta">${lamSachHtml(sp.moTa)}</p>` : ''}
                          ${
                            lh.soZaloSach
                              ? `<a class="tc-menu-zalo" href="${lamSachHtml(lh.linkZalo)}" target="_blank" rel="noopener noreferrer">Đặt hàng qua Zalo</a>`
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
          <section class="khoi-chung">
            <div class="khung-noi-dung">
              <div class="tc-gioi-thieu-khung">
                <h2 class="tieu-de-khoi">Câu chuyện nghề truyền thống</h2>
                ${coDoanVan ? `<p style="margin:0;line-height:1.75;">${lamSachHtml(duLieu.gioiThieu.doanVan)}</p>` : ''}
                ${
                  cacDiem.length
                    ? `<div class="tc-diem-chip">
                        ${cacDiem.map((d) => `<span>❖ ${lamSachHtml(d)}</span>`).join('')}
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
      layCssNenChung(bangMau, thuCongMauDat.fontChu.tieuDe, thuCongMauDat.fontChu.noiDung) +
      cssRieng;

    return bocKhungTaiLieuHtml({
      duLieu,
      fontTieuDe: thuCongMauDat.fontChu.tieuDe,
      fontNoiDung: thuCongMauDat.fontChu.noiDung,
      cssTongHop,
      noiDungBody,
    });
  },
};
