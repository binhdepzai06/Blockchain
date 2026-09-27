import type { QuizQuestionItem } from "./hashSha256Questions";

/**
 * Bộ 50 câu hỏi trắc nghiệm chủ đề "Mạng P2P & Node"
 * Cấu trúc phân loại mức độ:
 * - Phần I – Mức độ Dễ: 20 câu (Câu 1 - 20)
 * - Phần II – Mức độ Vừa: 20 câu (Câu 21 - 40)
 * - Phần III – Mức độ Khó: 10 câu (Câu 41 - 50)
 * 
 * Phân bố đáp án đúng đồng đều và ngẫu nhiên, không theo khuôn mẫu:
 * A (index 0): 13 câu
 * B (index 1): 13 câu
 * C (index 2): 12 câu
 * D (index 3): 12 câu
 * Tổng cộng: 50 câu
 */
export const P2P_NODES_50_QUESTIONS: QuizQuestionItem[] = [
  // ==========================================
  // PHẦN I – MỨC ĐỘ DỄ (20 CÂU)
  // ==========================================

  // 1. [Dễ]
  {
    id: 1,
    difficulty: "easy",
    question: "Mạng P2P (Peer-to-Peer) trong blockchain là gì?",
    options: [
      "Mọi dữ liệu bắt buộc phải truyền qua máy chủ trung tâm",
      "Chỉ các máy đào (miner) mới được phép kết nối mạng",
      "Mạng lưới mà các thiết bị (node) kết nối và giao tiếp trực tiếp với nhau ngang hàng",
      "Mạng máy tính chỉ có tối đa 2 thiết bị kết nối"
    ],
    correctIndex: 2, // C
  },

  // 2. [Dễ]
  {
    id: 2,
    difficulty: "easy",
    question: "Node trong blockchain là gì?",
    options: [
      "Một thiết bị tham gia mạng blockchain để lưu trữ hoặc xác thực dữ liệu",
      "Một block dữ liệu trong chuỗi khối",
      "Một loại ví điện tử lưu trữ coin",
      "Một thuật toán mã hóa mật mã học"
    ],
    correctIndex: 0, // A
  },

  // 3. [Dễ]
  {
    id: 3,
    difficulty: "easy",
    question: "Đặc điểm nổi bật của mạng phi tập trung là gì?",
    options: [
      "Luôn có một máy chủ chính điều hành mọi tác vụ",
      "Mọi node đều phụ thuộc hoàn toàn vào server trung tâm",
      "Chỉ có thể hoạt động trong phạm vi mạng nội bộ LAN",
      "Không có trung tâm kiểm soát duy nhất; quyền quyết định được phân tán giữa nhiều node"
    ],
    correctIndex: 3, // D
  },

  // 4. [Dễ]
  {
    id: 4,
    difficulty: "easy",
    question: "Bitcoin là ví dụ tiêu biểu của loại hệ thống nào?",
    options: [
      "Hệ thống tập trung (Centralized)",
      "Mạng P2P phi tập trung (Decentralized)",
      "Hệ thống phân tán có máy chủ điều phối trung tâm",
      "Mô hình máy khách – máy chủ truyền thống (Client–Server)"
    ],
    correctIndex: 1, // B
  },

  // 5. [Dễ]
  {
    id: 5,
    difficulty: "easy",
    question: "Full Node có nhiệm vụ chính là gì?",
    options: [
      "Chỉ chuyên thực hiện đào coin với card đồ họa",
      "Lưu toàn bộ blockchain và xác thực tính hợp lệ của mọi giao dịch",
      "Chỉ lưu trữ danh sách địa chỉ ví người dùng",
      "Chỉ lưu trữ các giá trị Merkle Root của khối mới"
    ],
    correctIndex: 1, // B
  },

  // 6. [Dễ]
  {
    id: 6,
    difficulty: "easy",
    question: "Lightweight Node còn thường được gọi bằng thuật ngữ nào?",
    options: [
      "Archive Node",
      "Mining Node",
      "Root Node",
      "SPV Node (Simplified Payment Verification)"
    ],
    correctIndex: 3, // D
  },

  // 7. [Dễ]
  {
    id: 7,
    difficulty: "easy",
    question: "Mempool là nơi chứa dữ liệu nào?",
    options: [
      "Các giao dịch chưa được xác nhận (hồ chờ của giao dịch)",
      "Các block đã được xác nhận và đào thành công",
      "Khóa bí mật của toàn bộ các tài khoản trong mạng",
      "Cây Merkle hoàn chỉnh của các khối trong quá khứ"
    ],
    correctIndex: 0, // A
  },

  // 8. [Dễ]
  {
    id: 8,
    difficulty: "easy",
    question: "Mining Pool là gì?",
    options: [
      "Một loại ví điện tử phần cứng",
      "Máy chủ cơ sở dữ liệu của một ngân hàng",
      "Nhóm các miner liên kết cùng khai thác và chia sẻ sức mạnh tính toán",
      "Một blockchain phụ độc lập"
    ],
    correctIndex: 2, // C
  },

  // 9. [Dễ]
  {
    id: 9,
    difficulty: "easy",
    question: "Node nào sau đây tiêu tốn nhiều dung lượng lưu trữ nhất?",
    options: [
      "SPV Node",
      "Ví điện tử di động (Mobile Wallet)",
      "Full Node (vì lưu toàn bộ lịch sử blockchain)",
      "Vùng nhớ đệm Mempool"
    ],
    correctIndex: 2, // C
  },

  // 10. [Dễ]
  {
    id: 10,
    difficulty: "easy",
    question: "SPV Node chủ yếu lưu trữ thành phần nào của blockchain?",
    options: [
      "Chỉ Block Header (đủ để xác minh cùng Merkle Proof)",
      "Toàn bộ lịch sử các giao dịch trong blockchain",
      "Chỉ cây Merkle đầy đủ của từng khối",
      "Chỉ duy nhất chuỗi Previous Hash"
    ],
    correctIndex: 0, // A
  },

  // 11. [Dễ]
  {
    id: 11,
    difficulty: "easy",
    question: "Mạng P2P giúp loại bỏ vai trò của thành phần nào sau đây?",
    options: [
      "Giá trị băm Merkle Root",
      "Dấu thời gian Timestamp",
      "Hàm băm mật mã học (Hash)",
      "Máy chủ trung tâm (các node giao tiếp trực tiếp với nhau)"
    ],
    correctIndex: 3, // D
  },

  // 12. [Dễ]
  {
    id: 12,
    difficulty: "easy",
    question: "Loại node nào trực tiếp tạo ra block mới trong cơ chế Proof of Work (PoW)?",
    options: [
      "SPV Node",
      "Miner (Miner giải bài toán PoW để tạo block)",
      "Nút ví điện tử trên điện thoại",
      "Nút chỉ lưu tiêu đề khối"
    ],
    correctIndex: 1, // B
  },

  // 13. [Dễ]
  {
    id: 13,
    difficulty: "easy",
    question: "Mạng P2P có ưu điểm lớn nhất là gì?",
    options: [
      "Khó bị lỗi tại một điểm duy nhất (không có single point of failure)",
      "Hoạt động mà không cần kết nối Internet",
      "Không cần sự tham gia của các máy tính node",
      "Không cần lưu trữ bất kỳ loại dữ liệu nào"
    ],
    correctIndex: 0, // A
  },

  // 14. [Dễ]
  {
    id: 14,
    difficulty: "easy",
    question: "Ứng dụng ví (Wallet) có phải là Node trong blockchain không?",
    options: [
      "Luôn luôn bắt buộc là Full Node",
      "Không bao giờ có thể là một node",
      "Có thể có hoặc không (một ví có thể chạy như SPV hoặc chỉ là ứng dụng giao diện)",
      "Chỉ là node nếu cài đặt trên hệ điều hành Linux"
    ],
    correctIndex: 2, // C
  },

  // 15. [Dễ]
  {
    id: 15,
    difficulty: "easy",
    question: "Full Node xác minh điều gì khi nhận được một block mới?",
    options: [
      "Chỉ kiểm tra trường số nguyên nonce",
      "Tính hợp lệ của giao dịch và block (chức năng quan trọng nhất)",
      "Chỉ kiểm tra trường timestamp",
      "Chỉ kiểm tra giá trị Merkle Root"
    ],
    correctIndex: 1, // B
  },

  // 16. [Dễ]
  {
    id: 16,
    difficulty: "easy",
    question: "Loại node nào tải và đồng bộ dữ liệu blockchain nhanh nhất?",
    options: [
      "Full Node truyền thống",
      "Archive Node lưu trữ",
      "Mining Node",
      "SPV Node (vì chỉ tải phần Header rất nhẹ)"
    ],
    correctIndex: 3, // D
  },

  // 17. [Dễ]
  {
    id: 17,
    difficulty: "easy",
    question: "Một giao dịch sau khi người dùng gửi đi sẽ vào đâu trước tiên?",
    options: [
      "Mempool (chờ miner đưa vào block)",
      "Lưu trực tiếp vào Block Header",
      "Ghi ngay vào khối khởi nguồn Genesis Block",
      "Lưu vào cây Merkle của toàn mạng"
    ],
    correctIndex: 0, // A
  },

  // 18. [Dễ]
  {
    id: 18,
    difficulty: "easy",
    question: "Miner có bắt buộc phải tự chạy một Full Node không?",
    options: [
      "Bắt buộc 100% trong mọi trường hợp",
      "Bắt buộc phải là SPV Node",
      "Hoàn toàn không thể kết nối với Full Node",
      "Không bắt buộc (nhiều miner tham gia khai thác thông qua pool)"
    ],
    correctIndex: 3, // D
  },

  // 19. [Dễ]
  {
    id: 19,
    difficulty: "easy",
    question: "P2P trong mạng máy tính là chữ viết tắt của thuật ngữ nào?",
    options: [
      "Public to Public",
      "Peer to Peer (kết nối ngang hàng)",
      "Private to Private",
      "Proof to Proof"
    ],
    correctIndex: 1, // B
  },

  // 20. [Dễ]
  {
    id: 20,
    difficulty: "easy",
    question: "Sự hiện diện của các Node giúp blockchain đạt được mục tiêu gì?",
    options: [
      "Nén dung lượng tập tin về 0 byte",
      "Tăng chỉ số tốc độ khung hình FPS",
      "Phân tán dữ liệu (mỗi node góp phần duy trì sổ cái phân tán)",
      "Mã hóa toàn bộ mạng bằng RSA"
    ],
    correctIndex: 2, // C
  },

  // ==========================================
  // PHẦN II – MỨC ĐỘ VỪA (20 CÂU)
  // ==========================================

  // 21. [Vừa]
  {
    id: 21,
    difficulty: "medium",
    question: "Khác biệt lớn nhất giữa Full Node và SPV Node là gì?",
    options: [
      "SPV Node đào coin với tốc độ nhanh hơn Full Node",
      "Full Node lưu toàn bộ blockchain, còn SPV chỉ lưu Header",
      "SPV Node trực tiếp tạo và xác nhận block mới",
      "Full Node không có khả năng xác minh dữ liệu"
    ],
    correctIndex: 1, // B
  },

  // 22. [Vừa]
  {
    id: 22,
    difficulty: "medium",
    question: "Vì sao SPV Node không cần lưu toàn bộ block mà vẫn xác minh được giao dịch?",
    options: [
      "Vì SPV sở hữu khóa Private Key của toàn mạng",
      "Vì SPV tự động giải mã được chuỗi Nonce",
      "Vì SPV dựa vào dấu thời gian Timestamp của thợ đào",
      "Vì SPV dùng Block Header và Merkle Proof (không cần tải toàn bộ block)"
    ],
    correctIndex: 3, // D
  },

  // 23. [Vừa]
  {
    id: 23,
    difficulty: "medium",
    question: "Mempool khác Blockchain ở điểm đặc trưng nào?",
    options: [
      "Mempool chỉ chứa giao dịch chờ xác nhận (chưa được ghi vào blockchain)",
      "Mempool là các giao dịch đã được xác nhận vĩnh viễn",
      "Mempool là một thành phần cố định trong Block Header",
      "Mempool không chứa bất kỳ giao dịch nào"
    ],
    correctIndex: 0, // A
  },

  // 24. [Vừa]
  {
    id: 24,
    difficulty: "medium",
    question: "Mining Pool ra đời nhằm mục đích chính yếu nào?",
    options: [
      "Làm giảm dung lượng bộ nhớ RAM của máy tính",
      "Thay thế hoàn toàn cơ chế Proof of Stake",
      "Chia sẻ sức mạnh tính toán và phần thưởng (tăng cơ hội đào được block)",
      "Giảm bớt số lượng node trên toàn mạng"
    ],
    correctIndex: 2, // C
  },

  // 25. [Vừa]
  {
    id: 25,
    difficulty: "medium",
    question: "Loại node nào bảo vệ tính phi tập trung của blockchain mạnh mẽ nhất?",
    options: [
      "Ví lưu trữ trên điện thoại di động",
      "SPV Node",
      "Máy chủ Mining Pool tập trung",
      "Full Node (càng nhiều Full Node độc lập, mạng càng bền vững)"
    ],
    correctIndex: 3, // D
  },

  // 26. [Vừa]
  {
    id: 26,
    difficulty: "medium",
    question: "Nếu một Full Node nhận được một block không hợp lệ thì nó sẽ xử lý như thế nào?",
    options: [
      "Vẫn chấp nhận và lưu vào chuỗi dữ liệu",
      "Bỏ qua và từ chối (node độc lập xác minh và thực thi quy tắc)",
      "Tự động sửa lại block cho đúng quy định",
      "Gửi báo cáo lỗi về ngân hàng trung ương"
    ],
    correctIndex: 1, // B
  },

  // 27. [Vừa]
  {
    id: 27,
    difficulty: "medium",
    question: "Tại sao SPV Node lại tiêu tốn rất ít bộ nhớ lưu trữ?",
    options: [
      "Vì không lưu blockchain đầy đủ (chỉ lưu các thông tin cần thiết)",
      "Vì SPV hoàn toàn không sử dụng thuật toán băm",
      "Vì SPV không sử dụng cây Merkle",
      "Vì SPV không cần kết nối với Internet"
    ],
    correctIndex: 0, // A
  },

  // 28. [Vừa]
  {
    id: 28,
    difficulty: "medium",
    question: "Trong mạng Bitcoin, các node giao tiếp với nhau bằng phương thức nào?",
    options: [
      "Thông qua cơ quan cấp dấu thời gian TSA trung tâm",
      "Thông qua một máy chủ điều phối đám mây duy nhất",
      "Truyền trực tiếp các message P2P (các node trao đổi block và transaction)",
      "Thông qua một địa chỉ DNS duy nhất"
    ],
    correctIndex: 2, // C
  },

  // 29. [Vừa]
  {
    id: 29,
    difficulty: "medium",
    question: "Điều gì xảy ra với mạng lưới khi một node bất kỳ bị ngoại tuyến (offline)?",
    options: [
      "Các node khác vẫn tiếp tục hoạt động bình thường (ưu điểm của mạng phi tập trung)",
      "Toàn bộ blockchain sẽ lập tức dừng hoạt động",
      "Toàn bộ mạng lưới sẽ bị lỗi đồng bộ dữ liệu",
      "Dữ liệu lịch sử giao dịch sẽ bị xóa sạch"
    ],
    correctIndex: 0, // A
  },

  // 30. [Vừa]
  {
    id: 30,
    difficulty: "medium",
    question: "Archive Node khác Full Node thông thường ở đặc điểm nào?",
    options: [
      "Archive Node không lưu trữ dữ liệu khối",
      "Archive Node chỉ lưu tiêu đề Block Header",
      "Archive Node là node chỉ dùng để đào coin",
      "Archive Node lưu cả lịch sử trạng thái đầy đủ (thường dùng trong Ethereum)"
    ],
    correctIndex: 3, // D
  },

  // 31. [Vừa]
  {
    id: 31,
    difficulty: "medium",
    question: "Nút cắt tỉa (Pruning Node) có nhiệm vụ gì?",
    options: [
      "Xóa toàn bộ blockchain sau mỗi tháng",
      "Cắt bớt dữ liệu cũ sau khi xác thực để giảm dung lượng lưu trữ",
      "Chỉ lưu trữ danh sách địa chỉ ví",
      "Chỉ dùng để tạo và ký khối mới"
    ],
    correctIndex: 1, // B
  },

  // 32. [Vừa]
  {
    id: 32,
    difficulty: "medium",
    question: "Một node mới tham gia vào mạng blockchain cần làm công việc gì trước tiên?",
    options: [
      "Tiến hành đào coin ngay lập tức",
      "Tự tạo một khối Genesis Block mới",
      "Đồng bộ blockchain (phải cập nhật trạng thái chuỗi hiện tại)",
      "Tự tạo cây Merkle mới cho toàn mạng"
    ],
    correctIndex: 2, // C
  },

  // 33. [Vừa]
  {
    id: 33,
    difficulty: "medium",
    question: "Khẳng định nào sau đây là KHÔNG ĐÚNG khi nói về Mining Pool?",
    options: [
      "Nhiều miner cùng làm việc và hợp tác khai thác",
      "Mining Pool chỉ có duy nhất một người đào độc lập tham gia",
      "Chia sẻ phần thưởng theo tỷ lệ đóng góp công sức",
      "Gộp chung hashrate của các thợ đào thành viên"
    ],
    correctIndex: 1, // B
  },

  // 34. [Vừa]
  {
    id: 34,
    difficulty: "medium",
    question: "Hash Rate của một Mining Pool đại diện cho đại lượng nào?",
    options: [
      "Tổng sức mạnh tính toán của các miner trong pool (tăng xác suất đào được block)",
      "Dung lượng lưu trữ của mạng blockchain",
      "Tổng số lượng Full Node đang online",
      "Số lượng giao dịch chờ xử lý trong Mempool"
    ],
    correctIndex: 0, // A
  },

  // 35. [Vừa]
  {
    id: 35,
    difficulty: "medium",
    question: "Loại node nào là sự lựa chọn phù hợp nhất để hoạt động trên điện thoại di động?",
    options: [
      "Full Node lưu trữ đầy đủ",
      "Archive Node lịch sử",
      "Mining Node đào coin",
      "SPV Node (nhẹ và tiết kiệm tài nguyên bộ nhớ, pin)"
    ],
    correctIndex: 3, // D
  },

  // 36. [Vừa]
  {
    id: 36,
    difficulty: "medium",
    question: "Khi vùng nhớ đệm Mempool bị đầy, hiện tượng nào thường xảy ra?",
    options: [
      "Block sẽ bị mất giá trị Merkle Root",
      "Mã hash của các block bị tính sai",
      "Giao dịch có thể chờ lâu hơn (thường do phí thấp hoặc mạng đông đúc)",
      "Ví của người dùng sẽ bị mất khóa bí mật"
    ],
    correctIndex: 2, // C
  },

  // 37. [Vừa]
  {
    id: 37,
    difficulty: "medium",
    question: "Loại node nào trong mạng góp phần lan truyền block mới?",
    options: [
      "Tất cả các node (sau khi nhận block hợp lệ, node tiếp tục phát tán cho đồng cấp)",
      "Chỉ các node miner",
      "Chỉ các ứng dụng ví người dùng",
      "Chỉ các nút SPV"
    ],
    correctIndex: 0, // A
  },

  // 38. [Vừa]
  {
    id: 38,
    difficulty: "medium",
    question: "Kiến trúc mạng P2P giúp tăng khả năng nào cho hệ thống blockchain?",
    options: [
      "Tăng dung lượng bộ nhớ RAM máy tính",
      "Khả năng chịu lỗi - Fault Tolerance (không phụ thuộc vào một máy chủ)",
      "Nén dung lượng dữ liệu video",
      "Làm giảm độ phức tạp của hàm băm"
    ],
    correctIndex: 1, // B
  },

  // 39. [Vừa]
  {
    id: 39,
    difficulty: "medium",
    question: "Một SPV Node muốn kiểm tra một giao dịch đã được xác nhận hay chưa sẽ yêu cầu điều gì?",
    options: [
      "Yêu cầu khóa Private Key của thợ đào",
      "Yêu cầu gửi toàn bộ cơ sở dữ liệu blockchain",
      "Yêu cầu Merkle Proof từ Full Node (cơ chế xác minh đơn giản)",
      "Yêu cầu cấp mã Nonce mới"
    ],
    correctIndex: 2, // C
  },

  // 40. [Vừa]
  {
    id: 40,
    difficulty: "medium",
    question: "Vai trò quan trọng nhất của một Full Node là gì?",
    options: [
      "Tự động tạo ra các thuật toán mã hóa RSA mới",
      "Tăng chỉ số khung hình FPS cho máy tính",
      "Tạo địa chỉ ví cá nhân cho người dùng",
      "Tự xác minh quy tắc của blockchain (không cần phải tin tưởng node khác)"
    ],
    correctIndex: 3, // D
  },

  // ==========================================
  // PHẦN III – MỨC ĐỘ KHÓ (10 CÂU)
  // ==========================================

  // 41. [Khó]
  {
    id: 41,
    difficulty: "hard",
    question: "Nếu toàn bộ Full Node trên thế giới biến mất và chỉ còn các nút SPV, điều gì sẽ xảy ra?",
    options: [
      "Mạng lưới vẫn xác minh độc lập hoàn toàn mà không gặp trở ngại gì",
      "Blockchain không còn nguồn dữ liệu đầy đủ để xác minh (SPV phụ thuộc Full Node)",
      "Các miner sẽ có sức mạnh tính toán cao hơn gấp đôi",
      "Vùng nhớ Mempool sẽ tự động biến mất vĩnh viễn"
    ],
    correctIndex: 1, // B
  },

  // 42. [Khó]
  {
    id: 42,
    difficulty: "hard",
    question: "Vì sao Full Node được xem là “xương sống” của mạng lưới Blockchain?",
    options: [
      "Vì lưu và xác minh toàn bộ quy tắc mạng (duy trì tính đúng đắn của blockchain)",
      "Vì Full Node tạo ra nhiều coin nhất trong toàn mạng",
      "Vì Full Node luôn sở hữu chỉ số hashrate cao nhất",
      "Vì Full Node luôn luôn đồng thời là miner"
    ],
    correctIndex: 0, // A
  },

  // 43. [Khó]
  {
    id: 43,
    difficulty: "hard",
    question: "Một cuộc tấn công Sybil trong mạng P2P chủ yếu nhằm mục đích gì?",
    options: [
      "Tăng dung lượng bộ nhớ RAM của nạn nhân",
      "Phá vỡ thuật toán băm an toàn SHA-256",
      "Tạo nhiều node giả mạo để gây ảnh hưởng và thao túng mạng (rủi ro trong P2P)",
      "Sửa đổi trực tiếp giá trị Merkle Root của khối cũ"
    ],
    correctIndex: 2, // C
  },

  // 44. [Khó]
  {
    id: 44,
    difficulty: "hard",
    question: "Ưu điểm lớn nhất của việc mạng lưới sở hữu hàng nghìn Full Node phân tán là gì?",
    options: [
      "Tăng kích thước dung lượng của từng block",
      "Làm giảm chi phí và phần thưởng đào coin",
      "Làm giảm số lượng giao dịch trên chuỗi",
      "Khó kiểm soát và kiểm duyệt mạng (tính phi tập trung mạnh mẽ hơn)"
    ],
    correctIndex: 3, // D
  },

  // 45. [Khó]
  {
    id: 45,
    difficulty: "hard",
    question: "Tại sao một miner thường chủ động kết nối với nhiều peer (node đồng cấp) cùng lúc?",
    options: [
      "Để nhận block và giao dịch nhanh hơn (giảm độ trễ truyền dữ liệu)",
      "Để tự động tăng dung lượng bộ nhớ RAM",
      "Để tạo ra nhiều địa chỉ ví lưu trữ hơn",
      "Để thay đổi giá trị Merkle Root của mạng"
    ],
    correctIndex: 0, // A
  },

  // 46. [Khó]
  {
    id: 46,
    difficulty: "hard",
    question: "Hiện tượng Fork tạm thời (phân nhánh tạm thời) thường xuất hiện trong tình huống nào?",
    options: [
      "Khi hai ví cùng gửi tiền tại một thời điểm",
      "Khi hai miner tạo block hợp lệ gần như cùng lúc (sau đó mạng sẽ hội tụ về một nhánh)",
      "Khi vùng đệm Mempool bị quá tải dung lượng",
      "Khi dấu thời gian Timestamp của khối bị sai lệch"
    ],
    correctIndex: 1, // B
  },

  // 47. [Khó]
  {
    id: 47,
    difficulty: "hard",
    question: "Trong mạng P2P, việc lan truyền block theo nhiều đường (Gossip protocol) mang lại lợi ích gì?",
    options: [
      "Làm giảm số lượng node cần thiết trong mạng",
      "Giúp thuật toán mã hóa chạy nhanh hơn",
      "Làm tăng kích thước chuỗi băm hash đầu ra",
      "Tăng khả năng block đến mọi node dù có lỗi mạng hoặc sự cố đường truyền"
    ],
    correctIndex: 3, // D
  },

  // 48. [Khó]
  {
    id: 48,
    difficulty: "hard",
    question: "Một Full Node tự quyết định block nhận được có hợp lệ hay không dựa trên cơ sở nào?",
    options: [
      "Luật giao thức (Consensus Rules) - node tự xác minh độc lập không cần tin bất kỳ bên nào",
      "Ý kiến chỉ đạo từ người đứng đầu nhóm miner",
      "Bình chọn từ các ứng dụng ví người dùng",
      "Tuyên bố từ Pool Leader có hashrate lớn nhất"
    ],
    correctIndex: 0, // A
  },

  // 49. [Khó]
  {
    id: 49,
    difficulty: "hard",
    question: "Nếu một Mining Pool chiếm quá nhiều Hash Rate trong mạng, rủi ro lớn nhất là gì?",
    options: [
      "Làm tăng tính phi tập trung của blockchain",
      "Làm giảm số lượng các block mới được tạo ra",
      "Nguy cơ tập trung sức mạnh khai thác (rủi ro tấn công 51%, chi tiêu hai lần)",
      "Giá trị Merkle Root của các block bị thay đổi ngẫu nhiên"
    ],
    correctIndex: 2, // C
  },

  // 50. [Khó]
  {
    id: 50,
    difficulty: "hard",
    question: "Phát biểu nào sau đây là đúng đắn và chuẩn xác nhất về Node trong blockchain?",
    options: [
      "Mọi node tham gia mạng blockchain đều bắt buộc phải là miner",
      "Các loại node có vai trò khác nhau nhưng cùng phối hợp duy trì hoạt động của mạng",
      "Node chỉ có công dụng duy nhất là dùng để lưu trữ ví cá nhân",
      "Các nút SPV luôn luôn bắt buộc lưu toàn bộ lịch sử blockchain"
    ],
    correctIndex: 1, // B
  }
];
