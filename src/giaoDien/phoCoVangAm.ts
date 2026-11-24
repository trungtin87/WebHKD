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

// Theme 5: Phố cổ vàng ấm — Lấy cảm hứng từ tường vàng phố cổ Hội An, mái ngói nâu & tiệm buôn gia truyền
export const phoCoVangAm: ThemeGiaoDien = {
  ma: 'phoCoVangAm',
  ten: 'Phố cổ vàng ấm',
  moTaNgan: 'Tường vàng Hội An phối nâu gỗ gụ, tạo cảm giác thân thương cho quán ăn và tiệm buôn truyền thống.',
  phongCach: 'Truyền thống · Phố cổ Hội An',
  nganhPhuHop: ['amThuc', 'thuCong', 'khac', 'nongSan'],
  bangMau: {
    nen: '#FEF9EC',
    beMat: '#FFFFFF',
    chinh: '#92400E',
    nhan: '#B91C1C',
    chu: '#291D12',
    chuPhu: '#5C4A38',
    vien: '#EAD7B0',
  },
  mauGoiY: ['#92400E', '#B91C1C', '#854D0E', '#14532D', '#4338CA'],
  fontChu: {
    tieuDe: 'Cormorant Garamond',
    noiDung: 'Be Vietnam Pro',
  },
  kieuDauTrang: 'bannerAnhLon',
  kieuSanPham: 'luoiThe',
  hoaTiet: 'gachBong',
  veTrang: (duLieu: DuLieuCuaHang, tuyChon: TuyChonVeTrang): string => {
    const bangMau = {
      ...phoCoVangAm.bangMau,
      chinh: tuyChon.mauChinhTuyChon || duLieu.giaoDien.mauChinh || phoCoVangAm.bangMau.chinh,
    };
    const lh = layThongTinLienHe(duLieu);
    const anhBanner = layNguonAnh(duLieu.anhBanner, 'anhBanner', tuyChon);
    const hoaTiet = taoHoaTietNenCss('gachBong', bangMau.chinh);

    const cssRieng = `
      .pc-dau-trang {
        background-color: #FDE68A;
        background-image: ${hoaTiet};
        border-bottom: 3px solid var(--mau-chinh);
        padding: 12px 0;
      }
      .pc-thanh-tren {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 16px;
      }
      .pc-cum-ten {
        display: flex;
        align-items: center;
        gap: 10px;
        min-width: 0;
        flex: 1;
      }
      .pc-ten-ch {
        margin: 0;
        font-family: var(--font-tieu-de);
        font-size: clamp(1.35rem, 3.2vw, 1.95rem);
        font-weight: 700;
        color: var(--mau-chinh);
        line-height: 1.2;
        overflow-wrap: anywhere;
      }
      .pc-banner {
        background-color: var(--mau-be-mat);
        border-bottom: 1px solid var(--mau-vien);
        padding: 20px 0;
      }
      .pc-banner-the {
        display: grid;
        grid-template-columns: 1fr;
        gap: 16px;
        align-items: center;
        background-color: #FEF3C7;
        border: 1px solid var(--mau-vien);
        border-radius: 14px;
        padding: 18px;
      }
      .pc-banner-the img {
        width: 100%;
        height: 210px;
        object-fit: cover;
        border-radius: 10px;
      }
      .pc-luoi-sp {
        display: grid;
        grid-template-columns: 1fr;
        gap: 14px;
      }
      .pc-the-sp {
        background-color: var(--mau-be-mat);
        border: 1px solid var(--mau-vien);
        border-radius: 14px;
        padding: 14px;
        display: flex;
        flex-direction: column;
        height: 100%;
      }
      .pc-the-sp img {
        width: 100%;
        aspect-ratio: 4 / 3;
        object-fit: cover;
        border-radius: 10px;
        margin-bottom: 10px;
      }
      .pc-sp-ten {
        margin: 0 0 4px 0;
        font-family: var(--font-tieu-de);
        font-size: 1.25rem;
        font-weight: 700;
        line-height: 1.25;
        overflow-wrap: anywhere;
      }
      .pc-sp-mo-ta {
        margin: 6px 0 10px 0;
        font-size: 0.88rem;
        color: var(--mau-chu-phu);
        flex: 1;
        overflow-wrap: anywhere;
      }
      @media (min-width: 680px) {
        .pc-banner { padding: 28px 0; }
        .pc-banner-the.co-anh { grid-template-columns: 1fr 1fr; padding: 26px; gap: 24px; }
        .pc-banner-the img { height: 250px; }
        .pc-luoi-sp { grid-template-columns: repeat(2, 1fr); gap: 16px; }
      }
      @media (min-width: 960px) {
        .pc-luoi-sp { grid-template-columns: repeat(3, 1fr); gap: 20px; }
      }
    `;

    const veKhoi: Record<MaKhoiHienThi, () => string> = {
      dauTrang: () => `
        <header class="pc-dau-trang">
          <div class="khung-noi-dung pc-thanh-tren">
            <div class="pc-cum-ten">
              <div>
                <h1 class="pc-ten-ch">${lamSachHtml(duLieu.tenCuaHang || 'Cửa hàng truyền thống')}</h1>
                ${duLieu.khauHieu.trim() ? `<div style="font-size:0.84rem;color:var(--mau-chu);">${lamSachHtml(duLieu.khauHieu)}</div>` : ''}
              </div>
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
        <section class="pc-banner">
          <div class="khung-noi-dung">
            <div class="pc-banner-the ${anhBanner ? 'co-anh' : ''}">
              <div>
                <h2 style="font-family:var(--font-tieu-de);font-size:clamp(1.6rem,3.5vw,2.3rem);margin:0 0 10px 0;color:var(--mau-chinh);">${lamSachHtml(duLieu.tenCuaHang || 'Hân hạnh đón tiếp')}</h2>
                ${duLieu.hoKinhDoanh.khuVucPhucVu.trim() ? `<p style="margin:0 0 14px 0;color:var(--mau-chu-phu);"><strong>Phục vụ:</strong> ${lamSachHtml(duLieu.hoKinhDoanh.khuVucPhucVu)}</p>` : ''}
                <div style="display:flex;flex-wrap:wrap;gap:10px;">
                  ${lh.soZaloSach ? `<a class="nut-chinh" href="${lamSachHtml(lh.linkZalo)}" target="_blank" rel="noopener noreferrer">Đặt qua Zalo</a>` : ''}
                  ${lh.soGoiSach ? `<a class="nut-goi" href="${lamSachHtml(lh.linkGoi)}">Gọi ${lamSachHtml(lh.soGoiHienThi)}</a>` : ''}
                </div>
              </div>
              ${anhBanner ? `<img src="${lamSachHtml(anhBanner)}" alt="Ảnh ${lamSachHtml(duLieu.tenCuaHang)}" />` : ''}
            </div>
          </div>
        </section>
      `,
      sanPham: () => {
        if (!duLieu.danhSachSanPham.length) return '';
        return `
          <section class="khoi-chung" id="san-pham">
            <div class="khung-noi-dung">
              <h2 class="tieu-de-khoi">Sản phẩm niêm yết giá</h2>
              <div class="pc-luoi-sp">
                ${duLieu.danhSachSanPham
                  .map((sp, idx) => {
                    const anhSp = layNguonAnh(sp.anh, `sp_${idx}`, tuyChon);
                    const { chuGia, laGiaCuThe } = taoNhanGiaSanPham(sp);
                    return `
                      <article class="pc-the-sp">
                        ${anhSp ? `<img src="${lamSachHtml(anhSp)}" alt="${lamSachHtml(sp.ten)}" />` : ''}
                        ${sp.noiBat ? `<span class="nhan-noi-bat">Món gợi ý</span>` : ''}
                        <h3 class="pc-sp-ten">${lamSachHtml(sp.ten)}</h3>
                        <div class="${laGiaCuThe ? 'gia-san-pham' : 'gia-tu-van'}">${chuGia}</div>
                        ${sp.moTa.trim() ? `<p class="pc-sp-mo-ta">${lamSachHtml(sp.moTa)}</p>` : '<div style="flex:1"></div>'}
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
          <section class="khoi-chung">
            <div class="khung-noi-dung">
              <div style="background:var(--mau-be-mat);border:1px solid var(--mau-vien);border-radius:16px;padding:24px;">
                <h2 class="tieu-de-khoi">Đôi nét về tiệm</h2>
                ${coDoanVan ? `<p style="margin:0 0 14px 0;color:var(--mau-chu-phu);">${lamSachHtml(duLieu.gioiThieu.doanVan)}</p>` : ''}
                ${
                  cacDiem.length
                    ? `<div style="display:flex;flex-wrap:wrap;gap:10px 20px;font-weight:600;color:var(--mau-chinh);">
                        ${cacDiem.map((d) => `<span>• ${lamSachHtml(d)}</span>`).join('')}
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
      layCssNenChung(bangMau, phoCoVangAm.fontChu.tieuDe, phoCoVangAm.fontChu.noiDung) + cssRieng;

    return bocKhungTaiLieuHtml({
      duLieu,
      fontTieuDe: phoCoVangAm.fontChu.tieuDe,
      fontNoiDung: phoCoVangAm.fontChu.noiDung,
      cssTongHop,
      noiDungBody,
    });
  },
};
