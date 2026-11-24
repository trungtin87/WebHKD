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

// Theme 3: Dịch vụ xanh dương — Rõ ràng, tin cậy, đầu trang chia đôi và bảng giá từng dòng
export const dichVuXanhDuong: ThemeGiaoDien = {
  ma: 'dichVuXanhDuong',
  ten: 'Dịch vụ xanh dương',
  moTaNgan: 'Tin cậy, đầu trang chia đôi trái/phải, bảng giá dịch vụ rõ ràng và nút gọi nổi bật.',
  phongCach: 'Hiện đại · Dịch vụ & Sửa chữa',
  nganhPhuHop: ['dichVu', 'khac'],
  bangMau: {
    nen: '#F8FAFC',
    beMat: '#FFFFFF',
    chinh: '#0F4C81',
    nhan: '#EA580C',
    chu: '#0F172A',
    chuPhu: '#475569',
    vien: '#E2E8F0',
  },
  mauGoiY: ['#0F4C81', '#1D4ED8', '#0369A1', '#0F766E', '#334155'],
  fontChu: {
    tieuDe: 'Be Vietnam Pro',
    noiDung: 'Be Vietnam Pro',
  },
  kieuDauTrang: 'chiaDoiTraiPhai',
  kieuSanPham: 'danhSachCoGia',
  hoaTiet: 'gachBong',
  veTrang: (duLieu: DuLieuCuaHang, tuyChon: TuyChonVeTrang): string => {
    const bangMau = {
      ...dichVuXanhDuong.bangMau,
      chinh: tuyChon.mauChinhTuyChon || duLieu.giaoDien.mauChinh || dichVuXanhDuong.bangMau.chinh,
    };
    const lh = layThongTinLienHe(duLieu);
    const anhBanner = layNguonAnh(duLieu.anhBanner, 'anhBanner', tuyChon);
    const anhCuaHang = layNguonAnh(duLieu.anhCuaHang, 'anhCuaHang', tuyChon);
    const anhDauTrang = anhBanner || anhCuaHang;
    const hoaTiet = taoHoaTietNenCss('gachBong', bangMau.chinh);

    const cssRieng = `
      .dv-dau-trang {
        background-color: var(--mau-chinh);
        color: #FFFFFF;
        padding: 10px 0;
      }
      .dv-thanh-tren {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 16px;
      }
      .dv-logo-nhom {
        display: flex;
        align-items: center;
        gap: 10px;
        min-width: 0;
        flex: 1;
      }
      .dv-ten-ch {
        font-weight: 700;
        font-size: 1.05rem;
        margin: 0;
        overflow-wrap: anywhere;
      }
      .dv-hero {
        background-color: var(--mau-be-mat);
        background-image: ${hoaTiet};
        border-bottom: 1px solid var(--mau-vien);
        padding: 28px 0;
      }
      .dv-hero-luoi {
        display: grid;
        grid-template-columns: 1fr;
        gap: 20px;
        align-items: center;
      }
      .dv-tieu-de-lon {
        margin: 0 0 8px 0;
        font-size: clamp(1.55rem, 3.8vw, 2.4rem);
        font-weight: 700;
        line-height: 1.25;
        color: var(--mau-chu);
        text-wrap: balance;
      }
      .dv-mo-ta-ngan {
        margin: 0 0 14px 0;
        color: var(--mau-chu-phu);
        font-size: 0.96rem;
      }
      .dv-hop-khu-vuc {
        background-color: #EFF6FF;
        border: 1px solid #BFDBFE;
        border-radius: 10px;
        padding: 10px 12px;
        font-size: 0.88rem;
        color: #1E3A8A;
        margin-bottom: 16px;
      }
      .dv-hero-anh img {
        width: 100%;
        height: 220px;
        object-fit: cover;
        border-radius: 12px;
        border: 1px solid var(--mau-vien);
      }
      .dv-hero-the-lien-he {
        background-color: var(--mau-chinh);
        color: #FFFFFF;
        border-radius: 12px;
        padding: 18px;
      }
      .dv-bang-gia {
        background-color: var(--mau-be-mat);
        border: 1px solid var(--mau-vien);
        border-radius: 14px;
        overflow: hidden;
      }
      .dv-hang-dv {
        display: flex;
        flex-direction: column;
        gap: 10px;
        padding: 14px 16px;
        border-bottom: 1px solid var(--mau-vien);
      }
      .dv-hang-dv:last-child { border-bottom: none; }
      .dv-hang-trai {
        display: flex;
        gap: 12px;
        align-items: flex-start;
        flex: 1;
        min-width: 0;
      }
      .dv-anh-nho {
        width: 64px;
        height: 64px;
        border-radius: 8px;
        object-fit: cover;
        flex-shrink: 0;
        border: 1px solid var(--mau-vien);
      }
      .dv-ten-dv {
        margin: 0 0 2px 0;
        font-size: 1rem;
        font-weight: 700;
        overflow-wrap: anywhere;
      }
      .dv-mo-ta-dv {
        margin: 0;
        font-size: 0.88rem;
        color: var(--mau-chu-phu);
        overflow-wrap: anywhere;
      }
      .dv-hang-phai {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
        flex-wrap: wrap;
      }
      .dv-nut-dat-nhanh {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-height: 40px;
        padding: 8px 14px;
        border-radius: 8px;
        background-color: var(--mau-chinh);
        color: #FFFFFF;
        text-decoration: none;
        font-weight: 600;
        font-size: 0.86rem;
        white-space: nowrap;
      }
      .dv-diem-manh-luoi {
        display: grid;
        grid-template-columns: 1fr;
        gap: 10px;
        margin-top: 14px;
      }
      .dv-diem-o {
        background-color: var(--mau-be-mat);
        border: 1px solid var(--mau-vien);
        border-radius: 10px;
        padding: 12px 14px;
        font-weight: 600;
        font-size: 0.92rem;
        color: var(--mau-chinh);
      }
      @media (min-width: 768px) {
        .dv-hero { padding: 42px 0; }
        .dv-hero-luoi { grid-template-columns: 1.15fr 0.85fr; gap: 36px; }
        .dv-hero-anh img { height: 260px; }
        .dv-hang-dv { flex-direction: row; align-items: center; justify-content: space-between; padding: 16px 20px; }
        .dv-hang-phai { justify-content: flex-end; text-align: right; flex-shrink: 0; }
        .dv-diem-manh-luoi { grid-template-columns: repeat(3, 1fr); gap: 14px; }
      }
    `;

    const veKhoi: Record<MaKhoiHienThi, () => string> = {
      dauTrang: () => `
        <header class="dv-dau-trang">
          <div class="khung-noi-dung dv-thanh-tren">
            <div class="dv-logo-nhom">
              <div>
                <p class="dv-ten-ch">${lamSachHtml(duLieu.tenCuaHang || 'Tên cửa hàng')}</p>
                ${duLieu.gioMoCua.trim() ? `<span style="font-size:0.78rem;opacity:0.9;">${lamSachHtml(duLieu.gioMoCua)}</span>` : ''}
              </div>
            </div>
            ${veDieuHuongNhanh(duLieu)}
            ${
              lh.soGoiSach
                ? `<a class="nut-goi" href="${lamSachHtml(lh.linkGoi)}">Gọi ${lamSachHtml(lh.soGoiHienThi)}</a>`
                : ''
            }
          </div>
        </header>
      `,
      banner: () => `
        <section class="dv-hero">
          <div class="khung-noi-dung dv-hero-luoi">
            <div>
              <h1 class="dv-tieu-de-lon">${lamSachHtml(duLieu.tenCuaHang || 'Dịch vụ địa phương')}</h1>
              ${duLieu.khauHieu.trim() ? `<p class="dv-mo-ta-ngan">${lamSachHtml(duLieu.khauHieu)}</p>` : ''}
              ${
                duLieu.hoKinhDoanh.khuVucPhucVu.trim()
                  ? `<div class="dv-hop-khu-vuc"><strong>Khu vực phục vụ:</strong> ${lamSachHtml(duLieu.hoKinhDoanh.khuVucPhucVu)}</div>`
                  : ''
              }
              <div style="display:flex;flex-wrap:wrap;gap:10px;">
                ${
                  lh.soGoiSach
                    ? `<a class="nut-goi" href="${lamSachHtml(lh.linkGoi)}">Gọi thợ ngay: ${lamSachHtml(lh.soGoiHienThi)}</a>`
                    : ''
                }
                ${
                  lh.soZaloSach
                    ? `<a class="nut-chinh" href="${lamSachHtml(lh.linkZalo)}" target="_blank" rel="noopener noreferrer">Nhắn Zalo báo giá</a>`
                    : ''
                }
              </div>
            </div>
            <div>
              ${
                anhDauTrang
                  ? `<div class="dv-hero-anh"><img src="${lamSachHtml(anhDauTrang)}" alt="Hình ảnh ${lamSachHtml(duLieu.tenCuaHang)}" /></div>`
                  : `<div class="dv-hero-the-lien-he">
                      <div style="font-size:0.88rem;opacity:0.9;margin-bottom:6px;">Hỗ trợ nhanh trong khu vực</div>
                      <div style="font-size:1.35rem;font-weight:700;margin-bottom:8px;">${lamSachHtml(lh.soGoiHienThi || lh.soZaloHienThi)}</div>
                      <div style="font-size:0.92rem;opacity:0.92;">${lamSachHtml(duLieu.diaChi)}</div>
                    </div>`
              }
            </div>
          </div>
        </section>
      `,
      sanPham: () => {
        if (!duLieu.danhSachSanPham.length) return '';
        return `
          <section class="khoi-chung" id="bang-gia">
            <div class="khung-noi-dung">
              <h2 class="tieu-de-khoi">Bảng giá tham khảo &amp; Dịch vụ</h2>
              <div class="dv-bang-gia">
                ${duLieu.danhSachSanPham
                  .map((sp, idx) => {
                    const anhSp = layNguonAnh(sp.anh, `sp_${idx}`, tuyChon);
                    const { chuGia, laGiaCuThe } = taoNhanGiaSanPham(sp);
                    return `
                      <div class="dv-hang-dv">
                        <div class="dv-hang-trai">
                          ${
                            anhSp
                              ? `<img class="dv-anh-nho" src="${lamSachHtml(anhSp)}" alt="${lamSachHtml(sp.ten)}" />`
                              : ''
                          }
                          <div>
                            ${sp.noiBat ? `<span class="nhan-noi-bat">Dịch vụ phổ biến</span>` : ''}
                            <h3 class="dv-ten-dv">${lamSachHtml(sp.ten)}</h3>
                            ${sp.moTa.trim() ? `<p class="dv-mo-ta-dv">${lamSachHtml(sp.moTa)}</p>` : ''}
                          </div>
                        </div>
                        <div class="dv-hang-phai">
                          <span class="${laGiaCuThe ? 'gia-san-pham' : 'gia-tu-van'}">${chuGia}</span>
                          ${
                            lh.soZaloSach
                              ? `<a class="dv-nut-dat-nhanh" href="${lamSachHtml(lh.linkZalo)}" target="_blank" rel="noopener noreferrer">Hẹn lịch Zalo</a>`
                              : ''
                          }
                        </div>
                      </div>
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
              <h2 class="tieu-de-khoi">Vì sao bà con tin chọn</h2>
              ${coDoanVan ? `<p style="margin:0;color:var(--mau-chu-phu);max-width:780px;">${lamSachHtml(duLieu.gioiThieu.doanVan)}</p>` : ''}
              ${
                cacDiem.length
                  ? `<div class="dv-diem-manh-luoi">
                      ${cacDiem.map((d) => `<div class="dv-diem-o">${lamSachHtml(d)}</div>`).join('')}
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
      layCssNenChung(bangMau, dichVuXanhDuong.fontChu.tieuDe, dichVuXanhDuong.fontChu.noiDung) +
      cssRieng;

    return bocKhungTaiLieuHtml({
      duLieu,
      fontTieuDe: dichVuXanhDuong.fontChu.tieuDe,
      fontNoiDung: dichVuXanhDuong.fontChu.noiDung,
      cssTongHop,
      noiDungBody,
    });
  },
};
