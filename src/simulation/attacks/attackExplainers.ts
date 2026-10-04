import type { AttackType } from "../../types/attack";

export interface AttackExplainer {
  analogy: string; // Ví von đời thường, nói trước lớp ai cũng hình dung được
  whatHappens: string; // Chuyện gì đang thật sự xảy ra trong mô phỏng
  whyItMatters: string; // Vì sao điều này nguy hiểm / blockchain phòng chống thế nào
}

// Mỗi loại tấn công cần 1 câu chuyện đơn giản để diễn đạt trước lớp,
// tách riêng khỏi mô tả kỹ thuật ngắn gọn trong attackTypes.ts.
export const ATTACK_EXPLAINERS: Record<AttackType, AttackExplainer> = {
  "51_PERCENT": {
    analogy:
      "Giống như một cuộc bỏ phiếu mà 1 người nắm hơn 50% số phiếu — người đó có thể tự quyết định kết quả, bất kể người khác bỏ phiếu gì.",
    whatHappens:
      "Kẻ tấn công gom đủ sức mạnh đào (hash power) để tự đào một chuỗi Block RIÊNG, bí mật, song song với chuỗi công khai. Khi chuỗi riêng dài hơn, kẻ tấn công công bố nó — mạng luôn chọn chuỗi dài nhất, nên chuỗi cũ (có giao dịch thật) bị thay thế.",
    whyItMatters:
      "Giao dịch tưởng đã 'xác nhận xong' có thể bị xoá khỏi lịch sử. Đây là lý do các sàn giao dịch luôn chờ nhiều Block xác nhận trước khi coi một giao dịch là chắc chắn — càng nhiều xác nhận, kẻ tấn công càng khó đuổi kịp.",
  },

  DOUBLE_SPEND: {
    analogy:
      "Giống như viết 2 tờ séc từ cùng 1 tài khoản chỉ có đủ tiền cho 1 tờ, rồi cố gắng tiêu cả 2 tờ cùng lúc ở 2 nơi khác nhau trước khi ngân hàng kịp phát hiện.",
    whatHappens:
      "Kẻ tấn công gửi cùng lúc 2 giao dịch tiêu CÙNG một số tiền — một giao dịch cho người bán (để nhận hàng), một giao dịch gửi ngược lại ví của chính mình. Chỉ 1 trong 2 được mạng xác nhận.",
    whyItMatters:
      "Nếu người bán giao hàng trước khi giao dịch được xác nhận chắc chắn, kẻ tấn công có thể lấy hàng miễn phí — giao dịch trả tiền của họ không bao giờ thực sự hoàn tất trên chain.",
  },

  SYBIL: {
    analogy:
      "Giống như 1 người tạo hàng trăm tài khoản mạng xã hội giả để thao túng 1 cuộc bình chọn — nhìn qua tưởng nhiều người ủng hộ, thật ra chỉ 1 người đứng sau tất cả.",
    whatHappens:
      "Kẻ tấn công tạo rất nhiều Node giả (danh tính ảo), kết nối chúng vào mạng ngang hàng cho tới khi chiếm phần lớn các Node mà mục tiêu nhìn thấy xung quanh mình.",
    whyItMatters:
      "Khi phần lớn 'hàng xóm' của một Node đều là giả, kẻ tấn công có thể kiểm soát thông tin Node đó nhận được — mở đường cho các tấn công khác như Eclipse bên dưới.",
  },

  ECLIPSE: {
    analogy:
      "Giống như cô lập 1 người bằng cách kiểm soát hết mọi tin nhắn, cuộc gọi họ nhận được — họ tưởng vẫn đang liên lạc với thế giới, nhưng thực ra chỉ đang nói chuyện với kẻ tấn công.",
    whatHappens:
      "Kẻ tấn công từ từ thay thế toàn bộ các kết nối (peer) xung quanh 1 Node mục tiêu bằng các Node do mình kiểm soát, cho tới khi Node đó bị 'nhật thực' — chỉ còn nghe được thông tin từ kẻ tấn công.",
    whyItMatters:
      "Node bị cô lập có thể bị cho xem một phiên bản blockchain giả, dẫn tới xác nhận nhầm các giao dịch gian lận mà không hề hay biết mạng thật đang ở trạng thái khác.",
  },

  SELFISH_MINING: {
    analogy:
      "Giống như biết trước đáp án 1 cuộc thi nhưng giấu đi, chờ tới khi đối thủ gần đuổi kịp mới tung ra để chiếm hết phần thưởng, thay vì công bố ngay khi có.",
    whatHappens:
      "Khi đào được 1 Block mới, kẻ tấn công KHÔNG công bố ngay cho mạng mà giữ bí mật, tiếp tục đào thêm trên chuỗi riêng. Họ chỉ công bố khi cần triệt tiêu công sức của các thợ đào trung thực.",
    whyItMatters:
      "Người đào trung thực lãng phí công sức vào các Block cuối cùng bị vô hiệu hoá, trong khi kẻ tấn công nhận phần thưởng nhiều hơn tỉ lệ sức mạnh đào thật sự của mình — phá vỡ tính công bằng của Proof-of-Work.",
  },
};