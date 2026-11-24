# Đặc tả form và theme – Web tạo landing page

Tài liệu này mô tả cách làm một web app: người dùng **điền form**, rồi **xem trước nhiều theme bằng chính dữ liệu của mình**, chọn một theme và **xuất ra trang web hoàn chỉnh**. Viết để đưa thẳng cho người hoặc AI khác lập trình.

## 1. Mục tiêu và nguyên tắc

- Người dùng là chủ tiệm nhỏ (bún, nông sản, thời trang, dịch vụ, đồ thủ công), ít rành công nghệ, dùng điện thoại là chính.
- Theme là trọng tâm. Form chỉ cần đơn giản, ít trường bắt buộc.
- Chạy hoàn toàn trên trình duyệt, không cần máy chủ. Dữ liệu lưu ở máy người dùng.
- Dữ liệu, bố cục và giao diện tách riêng: đổi theme thì dữ liệu giữ nguyên.
- Giao diện web app viết bằng tiếng Việt. Tên hàm, biến, khóa JSON đặt bằng tiếng Việt không dấu, kiểu camelCase, tường minh, không viết tắt khó hiểu (ví dụ `tenCuaHang`, `danhSachSanPham`).

## 2. Luồng người dùng

1. **Bước 1 – Chọn ngành.** Chọn 1 trong các ngành có sẵn. Hệ thống điền sẵn gợi ý nội dung.
2. **Bước 2 – Điền thông tin.** Form chia nhóm, có thanh tiến độ, tự lưu nháp.
3. **Bước 3 – Xem trước và chọn theme.** Lưới thu nhỏ nhiều theme, bấm vào để xem to.
4. **Bước 4 – Chỉnh nhẹ và xuất.** Đổi màu chính, bật/tắt khối, rồi tải file hoặc đẩy lên GitHub Pages.

Người dùng được quay lại bước trước bất cứ lúc nào mà không mất dữ liệu.

## 3. Quy hoạch form

Form chia 6 nhóm. Cột "Bắt buộc" là bắt buộc để sang bước xem trước.

### Nhóm A – Thông tin cơ bản

| Trường | Khóa | Kiểu | Bắt buộc | Quy tắc |
| --- | --- | --- | --- | --- |
| Ngành | `nganh` | chọn 1 | Có | `amThuc`, `nongSan`, `thoiTrang`, `myPham`, `dichVu`, `thuCong`, `khac` |
| Tên cửa hàng | `tenCuaHang` | chữ | Có | 2–60 ký tự |
| Khẩu hiệu | `khauHieu` | chữ | Không | tối đa 100 ký tự, có gợi ý theo ngành |
| Logo | `logo` | ảnh | Không | nếu thiếu thì dùng chữ cái đầu của tên |

### Nhóm B – Liên hệ

| Trường | Khóa | Kiểu | Bắt buộc | Quy tắc |
| --- | --- | --- | --- | --- |
| Số Zalo | `soZalo` | số điện thoại VN | Có | 10 số, bắt đầu bằng 0, tự bỏ khoảng trắng và dấu chấm |
| Số điện thoại gọi | `soDienThoai` | số điện thoại VN | Không | mặc định bằng `soZalo` |
| Địa chỉ | `diaChi` | chữ | Có | tối đa 150 ký tự |
| Link bản đồ | `linkBanDo` | đường dẫn | Không | nếu trống thì tự tạo link tìm kiếm Google Maps từ địa chỉ |
| Giờ mở cửa | `gioMoCua` | chữ | Không | ví dụ "5h – 11h hằng ngày" |
| Facebook | `mangXaHoi.facebook` | đường dẫn | Không |  |
| TikTok | `mangXaHoi.tiktok` | đường dẫn | Không |  |
| Instagram | `mangXaHoi.instagram` | đường dẫn | Không |  |

### Nhóm C – Sản phẩm (danh sách thêm/xóa/kéo đổi thứ tự)

Tối thiểu 1, tối đa 12 sản phẩm.

| Trường | Khóa | Kiểu | Bắt buộc | Quy tắc |
| --- | --- | --- | --- | --- |
| Tên sản phẩm | `ten` | chữ | Có | tối đa 50 ký tự |
| Giá | `gia` | số nguyên | Không | đơn vị đồng, hiển thị tự định dạng `17.000đ` |
| Đơn vị | `donVi` | chữ | Không | ví dụ `kg`, `0.5kg`, `hộp` |
| Kiểu giá | `kieuGia` | chọn 1 | Không | `coGia`, `lienHeDeBiet` (hiện chữ "Liên hệ để được tư vấn"), `anGia` |
| Mô tả ngắn | `moTa` | chữ | Không | tối đa 80 ký tự |
| Ảnh | `anh` | ảnh | Không |  |
| Nổi bật | `noiBat` | bật/tắt | Không | theme có thể làm to hoặc gắn nhãn |

### Nhóm D – Giới thiệu

| Trường | Khóa | Kiểu | Bắt buộc | Quy tắc |
| --- | --- | --- | --- | --- |
| Đoạn giới thiệu | `gioiThieu.doanVan` | chữ nhiều dòng | Không | tối đa 400 ký tự, có gợi ý theo ngành |
| Điểm nổi bật | `gioiThieu.diemNoiBat` | danh sách chữ | Không | tối đa 6 mục, mỗi mục tối đa 40 ký tự |
| Câu cảm ơn | `cauCamOn` | chữ | Không | mặc định "Cảm ơn bạn đã ủng hộ!" |

### Nhóm E – Hình ảnh

| Trường | Khóa | Kiểu | Bắt buộc | Quy tắc |
| --- | --- | --- | --- | --- |
| Ảnh banner | `anhBanner` | ảnh | Không | nếu thiếu, theme dùng nền màu và họa tiết |
| Ảnh cửa hàng | `anhCuaHang` | ảnh | Không | dùng ở khối giới thiệu và địa chỉ |

Quy tắc xử lý ảnh: khi tải lên, tự thu nhỏ cạnh dài tối đa 1600px và nén JPEG hoặc WebP chất lượng khoảng 0.8. Ảnh được lưu dạng chuỗi nhúng sẵn trong file dữ liệu để file xuất ra tự chứa đủ.

### Nhóm F – Tùy chọn hiển thị (có ở bước 4, không nằm trong form chính)

| Trường | Khóa | Kiểu |
| --- | --- | --- |
| Mã theme | `giaoDien.maTheme` | chọn 1 |
| Màu chính | `giaoDien.mauChinh` | màu |
| Các khối hiển thị | `giaoDien.cacKhoiHienThi` | danh sách bật/tắt |
| Hiện mã QR Zalo | `giaoDien.hienMaQrZalo` | bật/tắt, mặc định bật |

## 4. Cấu trúc dữ liệu đầy đủ

```json
{
  "phienBan": 1,
  "nganh": "amThuc",
  "tenCuaHang": "Bún Tươi Trần Trọng",
  "khauHieu": "Thơm ngon - Sạch sẽ - An toàn",
  "logo": null,
  "soZalo": "0909123456",
  "soDienThoai": "0909123456",
  "diaChi": "Chợ Trảng Bàng, H. Trảng Bàng, Tây Ninh",
  "linkBanDo": "",
  "gioMoCua": "",
  "mangXaHoi": { "facebook": "", "tiktok": "", "instagram": "" },
  "danhSachSanPham": [
    {
      "id": "sp1",
      "ten": "Bún Tươi Thủ Công",
      "gia": 17000,
      "donVi": "kg",
      "kieuGia": "coGia",
      "moTa": "",
      "anh": null,
      "noiBat": true
    }
  ],
  "gioiThieu": {
    "doanVan": "Chúng tôi chuyên cung cấp bún tươi thủ công...",
    "diemNoiBat": ["Bún tươi dai ngon", "Chả giò thơm giòn", "Giá cả hợp lý"]
  },
  "cauCamOn": "Cảm ơn bạn đã ủng hộ!",
  "anhBanner": null,
  "anhCuaHang": null,
  "giaoDien": {
    "maTheme": "nongSanXanhLa",
    "mauChinh": null,
    "cacKhoiHienThi": ["dauTrang", "banner", "sanPham", "gioiThieu", "diaChi", "lienHe", "cauCamOn"],
    "hienMaQrZalo": true
  }
}
```

Quy tắc chung của dữ liệu:

- Trường chữ để trống thì khối tương ứng tự ẩn, không hiện khung trống.
- Giá lưu là số nguyên, định dạng hiển thị do hàm riêng đảm nhiệm.
- Link Zalo: `https://zalo.me/` + `soZalo`. Mã QR sinh trên trình duyệt từ link này.
- Có trường `phienBan` để sau này đổi cấu trúc vẫn mở lại được dự án cũ.

## 5. Kiểm tra dữ liệu nhập

- Kiểm tra ngay khi người dùng rời khỏi ô nhập, báo lỗi bằng câu thân thiện (ví dụ "Số Zalo cần đủ 10 số, bạn kiểm tra lại giúp mình nhé").
- Không chặn người dùng ở các trường không bắt buộc.
- Số điện thoại: chấp nhận nhập `0909 123 456` hoặc `0909.123.456`, tự chuẩn hóa về `0909123456`.
- Đường dẫn mạng xã hội: nếu người dùng chỉ nhập tên tài khoản thì tự ghép thành đường dẫn đầy đủ.
- Văn bản nhập vào phải được làm sạch ký tự đặc biệt khi chèn vào HTML để tránh lỗi hiển thị và chèn mã độc.

## 6. Gợi ý nội dung theo ngành

Khi chọn ngành ở bước 1, tự điền sẵn (người dùng sửa lại được):

| Ngành | Khẩu hiệu mẫu | Điểm nổi bật mẫu |
| --- | --- | --- |
| `amThuc` | Thơm ngon – Sạch sẽ – An toàn | Nguyên liệu tươi mỗi ngày; Chế biến thủ công; Giá hợp lý |
| `nongSan` | Tươi ngon từ vườn nhà | Không hóa chất độc hại; Hái mới mỗi ngày; Giao tận nơi |
| `thoiTrang` | Phong cách của riêng bạn | Chất liệu thoải mái; Mẫu mới mỗi tuần; Đổi size dễ dàng |
| `myPham` | Chăm sóc làn da mỗi ngày | Thành phần rõ ràng; Chính hãng; Tư vấn tận tâm |
| `dichVu` | Uy tín – Nhanh chóng – Tận tâm | Có mặt đúng giờ; Báo giá rõ ràng; Bảo hành sau dịch vụ |
| `thuCong` | Làm bằng tay, gửi bằng tâm | Từng sản phẩm độc bản; Chất liệu tự nhiên; Nhận làm theo yêu cầu |
| `khac` | để trống | để trống |

Bảng này chỉ là dữ liệu mẫu, lưu trong một file riêng (`goiYTheoNganh`) để dễ thêm ngành.

## 7. Đặc tả theme

### 7.1. Một theme gồm những gì

Mỗi theme là một đối tượng đăng ký theo cấu trúc thống nhất:

```js
{
  ma: "nongSanXanhLa",
  ten: "Nông sản xanh lá",
  nganhPhuHop: ["nongSan", "amThuc"],
  bangMau: { nen: "#FFF8E1", chinh: "#2E7D32", nhan: "#D32F2F", chu: "#3E3E3E" },
  fontChu: { tieuDe: "Pacifico", noiDung: "Nunito" },
  kieuDauTrang: "bannerAnhLon",
  kieuSanPham: "luoiThe",
  hoaTiet: "laCay",
  veTrang: function (duLieu, tuyChon) { /* trả về chuỗi HTML */ },
  cssRieng: "..."
}
```

Quy tắc bắt buộc với mọi theme:

- Chỉ nhận `duLieu` đúng theo cấu trúc mục 4, không đọc dữ liệu từ nơi khác.
- Mỗi theme khác nhau ít nhất 3 thứ: **kiểu đầu trang**, **kiểu trình bày sản phẩm**, **font và họa tiết** (không chỉ đổi màu).
- Phải chạy đẹp trên điện thoại (chiều rộng 360px) và máy tính.
- Phải xử lý được: thiếu ảnh banner, thiếu ảnh sản phẩm, 1 sản phẩm, 12 sản phẩm, tên quá dài, không có giá.
- Màu chữ trên nền phải đủ tương phản để đọc rõ.
- Mỗi theme đặt trong một file riêng, thêm theme mới không cần sửa phần lõi.
- Mọi font lấy từ Google Fonts có font dự phòng; xuất file thì nhúng sẵn hoặc có font hệ thống thay thế.

### 7.2. Các kiểu khối dùng chung

| Khối | Các kiểu |
| --- | --- |
| Đầu trang | `bannerAnhLon`, `chuGiuaNenMau`, `chiaDoiTraiPhai` |
| Sản phẩm | `luoiThe`, `danhSachCoGia`, `menuDoc`, `anhLonXenKe` |
| Giới thiệu | `anhBenTrai`, `chiChu`, `theDiemNoiBat` |
| Liên hệ | `theLienHeCoQr`, `nutGoiCoDinhDuoiMan` |

### 7.3. Bốn theme đầu tiên

| Mã | Tên | Dành cho | Đầu trang | Sản phẩm | Cảm giác |
| --- | --- | --- | --- | --- | --- |
| `nongSanXanhLa` | Nông sản xanh lá | ẩm thực, nông sản | ảnh lớn, tiêu đề chữ viết tay | lưới thẻ | ấm, gần gũi, giống poster Bún Tươi Trần Trọng |
| `toiGianSang` | Tối giản sáng | thời trang, mỹ phẩm | chữ giữa, nền trắng | ảnh lớn xen kẽ | thanh lịch, nhiều khoảng trắng |
| `dichVuXanhDuong` | Dịch vụ xanh dương | dịch vụ, sửa chữa | chia đôi trái/phải | danh sách có giá | tin cậy, nút gọi điện nổi bật, nút cố định dưới màn hình |
| `thuCongMauDat` | Thủ công màu đất | đồ thủ công, quà tặng | nền màu, họa tiết truyền thống | menu dọc | mộc mạc, ấm áp |

## 8. Màn hình xem trước và chọn theme

- **Lưới thu nhỏ:** hiện toàn bộ theme cạnh nhau, tất cả dùng dữ liệu vừa nhập. Mỗi ô có tên theme và nhãn "Hợp ngành của bạn" nếu `nganhPhuHop` chứa ngành đã chọn.
- **Sắp xếp:** theme hợp ngành lên đầu, nhưng vẫn cho xem hết.
- **Xem to:** bấm vào một ô thì mở bản đầy đủ, có nút chuyển giữa chế độ điện thoại và máy tính.
- **Đổi theme nhanh:** thanh trượt hoặc nút trước/sau để đổi theme mà không về lưới.
- Bản thu nhỏ dựng bằng khung nhúng (iframe) hoặc thu nhỏ bằng CSS. Chỉ dựng lại khi dữ liệu đổi, để máy yếu không bị chậm.

## 9. Chỉnh nhẹ và xuất file

**Chỉnh nhẹ (bước 4):** đổi màu chính, bật/tắt khối, đổi thứ tự khối, đổi ảnh banner. Không làm thêm gì phức tạp hơn.

**Xuất:**

1. **Tải file HTML đơn:** ảnh, CSS, mã nhúng sẵn, mở được ngay.
2. **Tải file ZIP:** gồm `index.html` và thư mục ảnh riêng, dành cho người muốn tự đưa lên hosting.
3. **Lưu dự án (`.json`):** để mở lại chỉnh sửa sau.
4. **Đẩy lên GitHub Pages (làm ở giai đoạn sau):** người dùng nhập token, ứng dụng tạo repo và đẩy file lên, trả về link.

Trang xuất ra phải: có thẻ `meta viewport`, tiêu đề trang theo `tenCuaHang`, mô tả ngắn cho tìm kiếm, nút Zalo mở được trên điện thoại.

## 10. Lưu trữ trong trình duyệt

- Tự lưu nháp sau mỗi lần sửa (khoảng 1 giây sau khi ngừng gõ).
- Dùng `IndexedDB` cho dữ liệu có ảnh (nặng), `localStorage` chỉ cho cài đặt nhỏ.
- Mở lại thì hỏi "Tiếp tục bản đang làm dở?".
- Có nút "Bắt đầu lại" kèm xác nhận.
- Ghi rõ cho người dùng: dữ liệu nằm trên máy của họ, xóa dữ liệu trình duyệt là mất, nên tải file `.json` để dự phòng.

## 11. Quy ước đặt tên trong mã

- Hàm, biến, khóa JSON: tiếng Việt không dấu, camelCase, đủ nghĩa. Ví dụ: `chuanHoaSoDienThoai`, `dinhDangGiaTien`, `veKhoiSanPham`, `luuBanNhap`, `xuatFileHtml`.
- Hằng số: `HOA_SNAKE` tiếng Việt không dấu, ví dụ `SO_SAN_PHAM_TOI_DA`.
- Tên file theme: trùng với `ma`, ví dụ `nongSanXanhLa.js`.
- Không dùng từ viết tắt khó hiểu hoặc từ tiếng Anh lẫn lộn khi đã có từ tiếng Việt rõ nghĩa.
- Chú thích trong mã viết bằng tiếng Việt.

## 12. Bộ dữ liệu thử (bắt buộc có để kiểm tra mọi theme)

1. **Đầy đủ:** có đủ ảnh, 6 sản phẩm, giới thiệu đầy đủ.
2. **Tối thiểu:** chỉ có tên, số Zalo, địa chỉ, 1 sản phẩm không ảnh, không giá.
3. **Chữ dài:** tên cửa hàng 60 ký tự, tên sản phẩm 50 ký tự, giới thiệu 400 ký tự.
4. **Nhiều sản phẩm:** 12 sản phẩm, một số có ảnh, một số không.
5. **Thiếu ảnh hoàn toàn:** có sản phẩm và giá nhưng không có ảnh nào.

Mọi theme phải hiển thị đẹp với cả 5 bộ này trước khi được thêm vào danh sách.

## 13. Tiêu chí nghiệm thu

- Điền xong các trường bắt buộc thì sang được bước xem trước, không bị lỗi.
- Lưới thu nhỏ hiện đủ theme trong dưới 3 giây trên điện thoại tầm trung.
- Đổi theme không làm mất dữ liệu đã nhập.
- File HTML xuất ra mở được khi không có mạng (trừ font và thư viện mã QR nếu không nhúng).
- Mã QR Zalo quét ra đúng link.
- Cả 5 bộ dữ liệu thử đều hiển thị không vỡ bố cục ở chiều rộng 360px và 1280px.
- Dùng được bằng một tay trên điện thoại: nút đủ lớn, không cần cuộn ngang.

## 14. Lộ trình gợi ý

| Giai đoạn | Nội dung |
| --- | --- |
| 1 | Khung dự án, form 6 nhóm, kiểm tra dữ liệu, lưu nháp |
| 2 | Theme `nongSanXanhLa` + lưới xem trước + xuất file HTML đơn |
| 3 | Thêm 3 theme còn lại, gợi ý theo ngành, bộ dữ liệu thử |
| 4 | Chỉnh nhẹ (màu, bật/tắt khối), xuất ZIP, lưu và mở dự án `.json` |
| 5 | Đẩy lên GitHub Pages, thêm theme mới |

Sau giai đoạn 2 đã có sản phẩm dùng được, nên có thể cho người dùng thật thử sớm để lấy ý kiến trước khi làm thêm theme.
