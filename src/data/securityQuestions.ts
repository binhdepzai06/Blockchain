import type { QuizQuestionItem } from "./hashSha256Questions";

/**
 * Bộ 50 câu hỏi trắc nghiệm chủ đề "Bảo mật Blockchain"
 * Phân bố chuẩn theo tài liệu:
 * - Phần I – Mức độ Dễ: 20 câu (Câu 1 - 20)
 * - Phần II – Mức độ Vừa: 20 câu (Câu 21 - 40)
 * - Phần III – Mức độ Khó: 10 câu (Câu 41 - 50)
 * 
 * Phân bố đáp án đúng:
 * A (index 0): 13 câu
 * B (index 1): 13 câu
 * C (index 2): 12 câu
 * D (index 3): 12 câu
 * Tổng: 50 câu
 */
export const SECURITY_50_QUESTIONS: QuizQuestionItem[] = [
  // ==========================================
  // PHẦN I – MỨC ĐỘ DỄ (20 CÂU)
  // ==========================================

  // 1. [Dễ]
  {
    id: 1,
    difficulty: "easy",
    question: "Mục tiêu cơ bản và cốt lõi nhất của an toàn thông tin và bảo mật là gì?",
    options: [
      "Làm tăng tốc độ đường truyền mạng",
      "Bảo vệ dữ liệu và hệ thống khỏi sự truy cập, phá hoại hoặc chỉnh sửa trái phép",
      "Làm giảm dung lượng của các khối blockchain",
      "Tăng số lượng node thợ đào trong mạng"
    ],
    correctIndex: 1, // B
  },

  // 2. [Dễ]
  {
    id: 2,
    difficulty: "easy",
    question: "Mô hình tam giác an ninh kinh điển CIA Triad bao gồm 3 yếu tố nền tảng nào?",
    options: [
      "Confidentiality (Bí mật) – Integrity (Toàn vẹn) – Availability (Khả dụng)",
      "Consensus (Đồng thuận) – Identity (Danh tính) – Access (Truy cập)",
      "Cryptography (Mật mã) – Internet (Mạng) – Authentication (Xác thực)",
      "Certificate (Chứng chỉ) – Integrity (Toàn vẹn) – Audit (Kiểm toán)"
    ],
    correctIndex: 0, // A
  },

  // 3. [Dễ]
  {
    id: 3,
    difficulty: "easy",
    question: "Yếu tố 'Confidentiality' (Tính bảo mật / Tính bí mật) trong hệ thống thông tin nghĩa là gì?",
    options: [
      "Hệ thống luôn sẵn sàng hoạt động 24/7",
      "Dữ liệu không bao giờ bị thay đổi trái phép",
      "Mọi người dùng đều có quyền xem mã nguồn",
      "Chỉ những cá nhân hoặc hệ thống được cấp quyền hợp lệ mới được phép tiếp cận dữ liệu"
    ],
    correctIndex: 3, // D
  },

  // 4. [Dễ]
  {
    id: 4,
    difficulty: "easy",
    question: "Yếu tố 'Integrity' (Tính toàn vẹn dữ liệu) trong an ninh mạng được định nghĩa là gì?",
    options: [
      "Dữ liệu được nén lại để tiết kiệm ổ cứng",
      "Tốc độ phản hồi của máy chủ đạt mức cao nhất",
      "Dữ liệu được bảo đảm tính chính xác, không bị can thiệp, chỉnh sửa hay làm giả mạo trái phép",
      "Hệ thống không sử dụng thuật toán mã hóa"
    ],
    correctIndex: 2, // C
  },

  // 5. [Dễ]
  {
    id: 5,
    difficulty: "easy",
    question: "Yếu tố 'Availability' (Tính sẵn sàng / Tính khả dụng) đảm bảo điều gì cho người dùng?",
    options: [
      "Dữ liệu luôn được sao lưu thành 100 bản",
      "Người dùng hợp lệ luôn có thể truy cập và sử dụng dịch vụ/dữ liệu bất cứ khi nào có nhu cầu",
      "Chỉ các node thợ đào mới được phép truy cập",
      "Hệ thống có thể hoạt động mà không cần đường truyền mạng"
    ],
    correctIndex: 1, // B
  },

  // 6. [Dễ]
  {
    id: 6,
    difficulty: "easy",
    question: "Thuật toán nào sau đây thường được sử dụng phổ biến nhất để kiểm tra tính toàn vẹn của tệp tin và dữ liệu khối?",
    options: [
      "Thuật toán mã hóa RSA",
      "Thuật toán mã hóa đối xứng AES",
      "Thuật toán đường cong elliptic ECC",
      "Hàm băm mật mã học SHA-256"
    ],
    correctIndex: 3, // D
  },

  // 7. [Dễ]
  {
    id: 7,
    difficulty: "easy",
    question: "Chữ ký số (Digital Signature) được sinh ra bằng khóa riêng của người gửi chủ yếu nhằm đảm bảo hai thuộc tính nào?",
    options: [
      "Tính xác thực danh tính người gửi (Authentication) và tính toàn vẹn dữ liệu (Integrity)",
      "Giảm dung lượng tập tin và mã hóa đường truyền",
      "Tăng xung nhịp xử lý CPU cho thợ đào",
      "Tự động đạt được sự đồng thuận trong mạng"
    ],
    correctIndex: 0, // A
  },

  // 8. [Dễ]
  {
    id: 8,
    difficulty: "easy",
    question: "Khóa bí mật (Private Key) của ví tiền mã hóa bắt buộc phải được người dùng quản lý như thế nào?",
    options: [
      "Đăng tải công khai lên mạng xã hội để xác minh",
      "Chia sẻ cho các hội nhóm thợ đào",
      "Phải được lưu trữ và giữ bí mật tuyệt đối vì lộ khóa riêng đồng nghĩa với mất quyền kiểm soát ví",
      "Gửi qua email công khai cho sàn giao dịch"
    ],
    correctIndex: 2, // C
  },

  // 9. [Dễ]
  {
    id: 9,
    difficulty: "easy",
    question: "Khóa công khai (Public Key) trong hệ mật mã bất đối xứng thường được dùng để làm gì?",
    options: [
      "Tự động giải mã các tệp tin nén",
      "Để người khác xác minh chữ ký số của người gửi hoặc dùng để mã hóa thông điệp gửi tới chủ sở hữu",
      "Tạo ra các khối dữ liệu mới",
      "Khai thác coin tự động"
    ],
    correctIndex: 1, // B
  },

  // 10. [Dễ]
  {
    id: 10,
    difficulty: "easy",
    question: "Cơ chế hàm băm mật mã học giúp hệ thống blockchain phát hiện điều gì nhanh chóng nhất?",
    options: [
      "Bất kỳ sự thay đổi hay can thiệp sửa đổi dữ liệu nào dù chỉ 1 ký tự (nhờ hiệu ứng tuyết lở)",
      "Mất kết nối Internet của máy trạm",
      "Tình trạng thiếu hụt bộ nhớ RAM",
      "Hiện tượng cạn kiệt phí gas"
    ],
    correctIndex: 0, // A
  },

  // 11. [Dễ]
  {
    id: 11,
    difficulty: "easy",
    question: "Tấn công 51% (51% Attack) trong mạng Proof of Work xảy ra khi nào?",
    options: [
      "Khi có 51 người dùng cùng gửi giao dịch một lúc",
      "Khi một ví điện tử bị cài mã độc",
      "Khi nguồn cấp dữ liệu Oracle bị lỗi",
      "Khi một cá nhân hoặc một liên minh thợ đào nắm giữ hơn 50% tổng sức mạnh hashrate của mạng lưới"
    ],
    correctIndex: 3, // D
  },

  // 12. [Dễ]
  {
    id: 12,
    difficulty: "easy",
    question: "Cuộc tấn công Sybil (Sybil Attack) trong mạng ngang hàng P2P được hiểu là gì?",
    options: [
      "Tấn công từ chối dịch vụ phân tán DDoS",
      "Cài đặt mã độc tống tiền khóa cứng máy tính",
      "Kẻ tấn công tạo ra hàng loạt danh tính giả mạo (nút ma) trên mạng để thao túng và kiểm soát lưu lượng truyền tin",
      "Bẻ khóa thuật toán băm SHA-256"
    ],
    correctIndex: 2, // C
  },

  // 13. [Dễ]
  {
    id: 13,
    difficulty: "easy",
    question: "Vấn nạn 'Chi tiêu hai lần' (Double Spending) trong hệ thống tiền điện tử là gì?",
    options: [
      "Hành vi gian lận cố tình sử dụng cùng một số dư token/coin để chi tiêu cho hai giao dịch khác nhau",
      "Việc chuyển tiền vào hai địa chỉ ví của chính mình",
      "Việc thợ đào đóng gói hai block cùng một độ cao",
      "Việc trả phí mạng hai lần cho một lần chuyển khoản"
    ],
    correctIndex: 0, // A
  },

  // 14. [Dễ]
  {
    id: 14,
    difficulty: "easy",
    question: "Tấn công phát lại (Replay Attack) là hình thức tấn công như thế nào?",
    options: [
      "Tự ý thay đổi dấu thời gian Timestamp của mạng",
      "Kẻ xấu đánh chặn một giao dịch hợp lệ cũ rồi phát lại nhiều lần trên cùng chuỗi hoặc chuỗi rẽ nhánh (fork)",
      "Tăng chỉ số hashrate của máy đào",
      "Xóa bỏ khối dữ liệu khỏi lịch sử"
    ],
    correctIndex: 1, // B
  },

  // 15. [Dễ]
  {
    id: 15,
    difficulty: "easy",
    question: "Yếu tố then chốt và quan trọng nhất để người dùng tự bảo vệ an toàn cho ví tiền mã hóa của mình là gì?",
    options: [
      "Thay đổi địa chỉ IP máy tính liên tục",
      "Đóng góp sức mạnh vào Mining Pool",
      "Bảo vệ và giữ bí mật tuyệt đối Khóa riêng (Private Key) và Cụm từ khôi phục (Seed Phrase)",
      "Xác thực dấu thời gian Timestamp"
    ],
    correctIndex: 2, // C
  },

  // 16. [Dễ]
  {
    id: 16,
    difficulty: "easy",
    question: "Lỗ hổng bảo mật hợp đồng thông minh khét tiếng nhất từng khiến Ethereum bị thất thoát hàng chục triệu USD trong vụ hack The DAO là gì?",
    options: [
      "Va chạm băm Hash Collision",
      "Tấn công mạo danh Sybil Attack",
      "Tấn công 51% hashrate",
      "Tấn công tái nhập (Reentrancy Attack)"
    ],
    correctIndex: 3, // D
  },

  // 17. [Dễ]
  {
    id: 17,
    difficulty: "easy",
    question: "Khái niệm 'Authentication' (Xác thực) trong bảo mật máy tính mang ý nghĩa là gì?",
    options: [
      "Quá trình kiểm tra và xác minh danh tính xem người dùng hoặc thiết bị thực sự là ai",
      "Quá trình nén dữ liệu tập tin",
      "Thuật toán giải bài toán Proof of Work",
      "Quá trình mã hóa toàn bộ dữ liệu ổ đĩa"
    ],
    correctIndex: 0, // A
  },

  // 18. [Dễ]
  {
    id: 18,
    difficulty: "easy",
    question: "Khái niệm 'Authorization' (Ủy quyền / Phân quyền) khác với Authentication ở chỗ nào?",
    options: [
      "Authorization là kiểm tra danh tính người dùng",
      "Authorization là xác định rõ người dùng sau khi đã xác thực thì được phép truy cập những tài nguyên hay quyền hạn cụ thể nào",
      "Authorization là tạo chữ ký số mật mã",
      "Authorization là mã hóa dữ liệu bằng chuẩn AES"
    ],
    correctIndex: 1, // B
  },

  // 19. [Dễ]
  {
    id: 19,
    difficulty: "easy",
    question: "Thuật ngữ 'Malware' (Phần mềm độc hại) dùng để chỉ những đối tượng nào?",
    options: [
      "Các thiết bị mạng phần cứng như Router hay Switch",
      "Các thuật toán hàm băm mật mã",
      "Các hợp đồng thông minh chuẩn ERC-20",
      "Các chương trình độc hại như virus máy tính, mã độc tống tiền (ransomware), spyware hoặc trojan lén đánh cắp dữ liệu"
    ],
    correctIndex: 3, // D
  },

  // 20. [Dễ]
  {
    id: 20,
    difficulty: "easy",
    question: "Một mật khẩu (Password) được xem là mạnh và an toàn khi thỏa mãn tiêu chí nào?",
    options: [
      "Chỉ gồm các chữ số dễ nhớ",
      "Chỉ gồm các chữ cái viết thường",
      "Có độ dài đủ lớn (từ 12-16 ký tự trở lên) kết hợp đa dạng chữ hoa, chữ thường, số và ký tự đặc biệt",
      "Sử dụng ngày tháng năm sinh hoặc số điện thoại của bản thân"
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
    question: "Cơ chế xác thực đa yếu tố MFA (Multi-Factor Authentication) hoạt động dựa trên nguyên tắc nào?",
    options: [
      "Yêu cầu người dùng cung cấp từ hai bằng chứng xác thực độc lập trở lên (những gì bạn biết, bạn có, hoặc chính bạn)",
      "Mã hóa dữ liệu lặp lại hai lần liên tiếp",
      "Sử dụng đồng thời hai mạng blockchain khác nhau",
      "Tạo hai địa chỉ ví tiền mã hóa cùng lúc"
    ],
    correctIndex: 0, // A
  },

  // 22. [Vừa]
  {
    id: 22,
    difficulty: "medium",
    question: "Ví lạnh (Cold Wallet / Hardware Wallet) mang lại độ an toàn vượt trội hơn ví nóng chủ yếu vì lý do gì?",
    options: [
      "Vì nó có dung lượng bộ nhớ RAM lớn hơn",
      "Vì nó hoàn toàn hoạt động ngoại tuyến, không kết nối Internet thường xuyên, loại bỏ nguy cơ bị hack trực tuyến",
      "Vì nó có khả năng đào coin với tốc độ cao hơn",
      "Vì nó không yêu cầu phải sử dụng Private Key"
    ],
    correctIndex: 1, // B
  },

  // 23. [Vừa]
  {
    id: 23,
    difficulty: "medium",
    question: "Ví nóng (Hot Wallet / Extension Wallet) phù hợp và tối ưu nhất cho trường hợp sử dụng nào?",
    options: [
      "Lưu trữ một lượng tài sản khổng lồ trong nhiều năm",
      "Chạy một Full Node của mạng Bitcoin",
      "Thực hiện các giao dịch thường xuyên, tương tác DApp hàng ngày nhờ tính tiện lợi và kết nối trực tuyến nhanh",
      "Lưu trữ bản sao lưu của hệ điều hành"
    ],
    correctIndex: 2, // C
  },

  // 24. [Vừa]
  {
    id: 24,
    difficulty: "medium",
    question: "Hình thức tấn công lừa đảo Phishing trong thị trường tiền mã hóa thường nhắm vào mục tiêu gì?",
    options: [
      "Làm tăng chỉ số hashrate của toàn mạng",
      "Tạo ra cây Merkle mới cho block",
      "Thay đổi giá trị Nonce của thợ đào",
      "Giả mạo giao diện website, sàn giao dịch hoặc email để đánh lừa người dùng nhập Private Key hoặc Seed Phrase"
    ],
    correctIndex: 3, // D
  },

  // 25. [Vừa]
  {
    id: 25,
    difficulty: "medium",
    question: "Cụm từ khôi phục bí mật (Seed Phrase / 12-24 từ) nên được lưu trữ theo cách nào để an toàn nhất?",
    options: [
      "Ghi chép ra giấy hoặc dập trên thẻ kim loại rồi cất giữ an toàn ở nơi ngoại tuyến, không chụp ảnh hay lưu trên đám mây",
      "Tải lên lưu trữ công khai trên Google Drive hoặc Dropbox",
      "Gửi qua tin nhắn mạng xã hội cho bạn bè",
      "Đưa trực tiếp vào phần mô tả giao dịch trên blockchain"
    ],
    correctIndex: 0, // A
  },

  // 26. [Vừa]
  {
    id: 26,
    difficulty: "medium",
    question: "Tấn công từ chối dịch vụ phân tán DDoS (Distributed Denial of Service) làm tổn hại trực tiếp nhất đến yếu tố nào của CIA Triad?",
    options: [
      "Tính bảo mật Confidentiality",
      "Tính sẵn sàng Availability (làm tê liệt dịch vụ, khiến người dùng hợp lệ không thể kết nối)",
      "Tính toàn vẹn Integrity",
      "Tính định danh Authentication"
    ],
    correctIndex: 1, // B
  },

  // 27. [Vừa]
  {
    id: 27,
    difficulty: "medium",
    question: "Khi lưu trữ mật khẩu người dùng trong cơ sở dữ liệu, việc bổ sung chuỗi Salt trước khi băm có tác dụng gì?",
    options: [
      "Làm giảm thời gian tính toán băm về 0",
      "Tự động gửi email thông báo cho người dùng",
      "Vô hiệu hóa các cuộc tấn công tra cứu bảng tính toán sẵn (Rainbow Table Attack)",
      "Thay thế hoàn toàn sự cần thiết của mật mã học"
    ],
    correctIndex: 2, // C
  },

  // 28. [Vừa]
  {
    id: 28,
    difficulty: "medium",
    question: "Tấn công thao túng Oracle (Oracle Attack / Flash Loan Price Manipulation) gây hại cho hệ sinh thái DeFi như thế nào?",
    options: [
      "Làm thay đổi thuật toán hàm băm SHA-256",
      "Khiến thợ đào bị mất phần thưởng khối",
      "Làm thay đổi giá trị Merkle Root của khối",
      "Kẻ tấn công thao túng nguồn cấp dữ liệu giá tài sản, khiến Smart Contract tính toán sai lệch và bị rút cạn thanh khoản"
    ],
    correctIndex: 3, // D
  },

  // 29. [Vừa]
  {
    id: 29,
    difficulty: "medium",
    question: "Quy trình kiểm toán bảo mật Smart Contract (Smart Contract Audit) nhằm mục đích trọng tâm là gì?",
    options: [
      "Rà soát, phân tích mã nguồn độc lập bởi chuyên gia bảo mật nhằm phát hiện sớm các lỗ hổng logic trước khi triển khai Mainnet",
      "Trực tiếp tham gia đào coin cho mạng lưới",
      "Tự động tạo ra các token ERC-20 miễn phí",
      "Tăng mức phí Gas tối đa cho hợp đồng"
    ],
    correctIndex: 0, // A
  },

  // 30. [Vừa]
  {
    id: 30,
    difficulty: "medium",
    question: "Lỗ hổng Reentrancy (Tái nhập) phát sinh do lỗi thiết kế mã nguồn nào sau đây?",
    options: [
      "Hợp đồng sử dụng hàm băm bị va chạm",
      "Hợp đồng thực hiện gọi hàm gửi tiền ra bên ngoài trước khi cập nhật biến trạng thái số dư nội bộ của người rút",
      "Hợp đồng bị tấn công phát lại giao dịch Replay",
      "Hợp đồng bị tấn công bởi mạng lưới Sybil"
    ],
    correctIndex: 1, // B
  },

  // 31. [Vừa]
  {
    id: 31,
    difficulty: "medium",
    question: "Nguyên tắc đặc quyền tối thiểu 'Principle of Least Privilege' trong an ninh phần mềm có ý nghĩa gì?",
    options: [
      "Cấp toàn quyền truy cập quản trị cho mọi tài khoản",
      "Không cấp bất kỳ quyền nào khiến hệ thống không hoạt động được",
      "Chỉ cấp đúng những quyền hạn tối thiểu và vừa đủ cho một người dùng hoặc tiến trình để hoàn thành nhiệm vụ được giao",
      "Chỉ trao quyền cho chủ sở hữu Owner duy nhất"
    ],
    correctIndex: 2, // C
  },

  // 32. [Vừa]
  {
    id: 32,
    difficulty: "medium",
    question: "Tính chất kháng va chạm (Collision Resistance) của hàm băm đóng vai trò an ninh gì trong blockchain?",
    options: [
      "Tăng tốc độ giải mã thuật toán RSA",
      "Làm giảm kích thước của khối",
      "Làm giảm phí giao dịch gas",
      "Bảo đảm rằng kẻ tấn công gần như không thể tìm ra hai giao dịch khác nhau có cùng giá trị hash để thay thế gian lận"
    ],
    correctIndex: 3, // D
  },

  // 33. [Vừa]
  {
    id: 33,
    difficulty: "medium",
    question: "Tại sao phương thức xác thực 2FA qua ứng dụng Authenticator (như Google/Microsoft Authenticator) lại an toàn hơn xác thực qua SMS?",
    options: [
      "Vì mã OTP được sinh cục bộ theo thời gian trên máy, không phụ thuộc vào sóng viễn thông và miễn nhiễm với tấn công SIM Swap",
      "Vì ứng dụng Authenticator không cần kết nối mạng Internet",
      "Vì nó tự động tạo ra cây Merkle",
      "Vì sử dụng ứng dụng thì hoàn toàn miễn phí"
    ],
    correctIndex: 0, // A
  },

  // 34. [Vừa]
  {
    id: 34,
    difficulty: "medium",
    question: "Hình thức tấn công SIM Swap nhắm vào mục tiêu nào để chiếm đoạt tài khoản tiền mã hóa của nạn nhân?",
    options: [
      "Thao túng thuật toán băm Merkle Root",
      "Đánh lừa nhà mạng viễn thông để chuyển quyền kiểm soát số điện thoại của nạn nhân sang thẻ SIM của kẻ tấn công nhằm chặn mã OTP",
      "Chiếm đoạt sức mạnh Hashrate của máy đào",
      "Đánh sập máy chủ của Mining Pool"
    ],
    correctIndex: 1, // B
  },

  // 35. [Vừa]
  {
    id: 35,
    difficulty: "medium",
    question: "Phương pháp sao lưu Seed Phrase nào sau đây được các chuyên gia bảo mật khuyến nghị an toàn nhất chống thiên tai và hacker?",
    options: [
      "Chụp ảnh màn hình lưu trên điện thoại",
      "Lưu trong tệp văn bản Word trên máy tính có kết nối mạng",
      "Khắc lên tấm thép/titanium kim loại chống cháy, chống nước và cất giữ ở nơi bảo mật vật lý",
      "Tự gửi email cho chính mình qua hòm thư Gmail"
    ],
    correctIndex: 2, // C
  },

  // 36. [Vừa]
  {
    id: 36,
    difficulty: "medium",
    question: "Để phòng ngừa các cuộc tấn công mạo danh qua website ví lừa đảo, người dùng nên thực hiện thói quen an toàn nào?",
    options: [
      "Tắt kết nối Wi-Fi khi truy cập",
      "Nhập thử Seed Phrase để kiểm tra tính năng",
      "Chỉnh sửa dấu thời gian Timestamp của máy",
      "Luôn kiểm tra kỹ tên miền chính thức (URL), lưu trang web chuẩn vào Bookmark và không bao giờ nhập Seed Phrase vào bất kỳ trang web nào"
    ],
    correctIndex: 3, // D
  },

  // 37. [Vừa]
  {
    id: 37,
    difficulty: "medium",
    question: "Một báo cáo kiểm toán Smart Contract Audit thành công KHÔNG ĐỒNG NGHĨA với điều gì?",
    options: [
      "Không đảm bảo loại bỏ 100% mọi lỗi hay rủi ro tiềm ẩn (chỉ giúp giảm thiểu tối đa các lỗ hổng đã biết)",
      "Không giúp giảm bớt rủi ro bảo mật",
      "Không hỗ trợ phát hiện các lỗi logic nghiệp vụ",
      "Không tiến hành kiểm tra mã nguồn hợp đồng"
    ],
    correctIndex: 0, // A
  },

  // 38. [Vừa]
  {
    id: 38,
    difficulty: "medium",
    question: "Cơ chế chống phát lại giao dịch (Replay Protection) sau các đợt hard fork (như giữa ETH và ETC) thường sử dụng yếu tố nào?",
    options: [
      "Tăng kích thước hàm băm",
      "Bổ sung Chain ID (mã định danh chuỗi độc nhất) vào dữ liệu thông điệp giao dịch trước khi ký số",
      "Thay đổi địa chỉ của khối khởi nguồn Genesis",
      "Tự động sinh lại cặp khóa bí mật"
    ],
    correctIndex: 1, // B
  },

  // 39. [Vừa]
  {
    id: 39,
    difficulty: "medium",
    question: "Mã độc tống tiền (Ransomware) hoạt động theo phương thức nào gây thiệt hại cho nạn nhân?",
    options: [
      "Tự động đào coin làm quá tải phần cứng",
      "Làm giảm chỉ số FPS của màn hình",
      "Mã hóa toàn bộ dữ liệu quan trọng của nạn nhân bằng mật mã mạnh rồi tống tiền đòi khóa giải mã bằng tiền ảo",
      "Tạo ra các bộ sưu tập NFT giả mạo"
    ],
    correctIndex: 2, // C
  },

  // 40. [Vừa]
  {
    id: 40,
    difficulty: "medium",
    question: "Tính an toàn và bảo mật toàn diện của một hệ thống Blockchain phụ thuộc vào sự phối hợp của các trụ cột nào?",
    options: [
      "Chỉ phụ thuộc duy nhất vào thuật toán mật mã học",
      "Chỉ phụ thuộc vào cơ chế đồng thuận phân tán",
      "Chỉ phụ thuộc vào tốc độ đường truyền của các node",
      "Sự kết hợp đồng bộ giữa mật mã học vững chắc, cơ chế đồng thuận kinh tế chuẩn mực và nhận thức an toàn của người dùng"
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
    question: "Ngay cả khi kẻ tấn công thành công kiểm soát trên 51% hashrate của mạng Bitcoin, hành động nào sau đây kẻ đó HOÀN TOÀN KHÔNG THỂ THỰC HIỆN ĐƯỢC?",
    options: [
      "Không thể tự ý tạo ra Bitcoin mới vượt quá quy tắc đồng thuận hoặc chi tiêu tiền từ ví của người khác mà không có Private Key",
      "Không thể đảo ngược các giao dịch gần đây của chính mình",
      "Không thể ngăn chặn hoặc trì hoãn các giao dịch mới",
      "Không thể thực hiện hành vi chi tiêu kép Double Spending"
    ],
    correctIndex: 0, // A
  },

  // 42. [Khó]
  {
    id: 42,
    difficulty: "hard",
    question: "Tại sao cuộc tấn công Sybil lại đặc biệt nguy hiểm đối với các giao thức mạng ngang hàng P2P không có cơ chế chứng thực?",
    options: [
      "Vì nó phá vỡ hoàn toàn thuật toán SHA-256",
      "Vì kẻ tấn công tạo ra số lượng node ma áp đảo để bao vây, cô lập nút nạn nhân (Eclipse Attack) và cấp thông tin sai lệch về sổ cái",
      "Vì nó làm xóa sạch lịch sử các khối trong quá khứ",
      "Vì nó tự động thay đổi giá trị Merkle Root của toàn mạng"
    ],
    correctIndex: 1, // B
  },

  // 43. [Khó]
  {
    id: 43,
    difficulty: "hard",
    question: "Biện pháp kiến trúc chuẩn mực và hiệu quả nhất trong lập trình Solidity để triệt tiêu hoàn toàn lỗ hổng Reentrancy là gì?",
    options: [
      "Tăng lượng gas tối đa cho giao dịch",
      "Bổ sung chuỗi Salt trước khi băm dữ liệu",
      "Áp dụng mẫu thiết kế Checks-Effects-Interactions (CEI) hoặc sử dụng ReentrancyGuard mutex lock",
      "Chuyển sang sử dụng thuật toán băm MD5"
    ],
    correctIndex: 2, // C
  },

  // 44. [Khó]
  {
    id: 44,
    difficulty: "hard",
    question: "Nếu nguồn cấp dữ liệu Oracle phi tập trung bị thao túng giá trong một giao dịch vay mượn DeFi, hậu quả trực tiếp sẽ là gì?",
    options: [
      "Các block trong quá khứ bị mất liên kết hash",
      "Khối dữ liệu bị từ chối bởi các thợ đào",
      "Toàn bộ máy ảo EVM sẽ ngừng hoạt động",
      "Smart Contract vẫn thực thi tự động theo dữ liệu giá sai lệch, dẫn đến việc tài sản bị thanh lý oan hoặc bị rút cạn quỹ cho vay"
    ],
    correctIndex: 3, // D
  },

  // 45. [Khó]
  {
    id: 45,
    difficulty: "hard",
    question: "Nếu một kẻ tấn công chiếm đoạt được Cụm từ khôi phục (Seed Phrase) của một người dùng, quyền hạn của kẻ tấn công là gì?",
    options: [
      "Có thể khôi phục toàn bộ cây khóa của ví trên bất kỳ thiết bị nào và rút sạch toàn bộ mọi tài sản của nạn nhân",
      "Chỉ có thể xem được số dư mà không thể gửi tiền",
      "Chỉ có thể xem được lịch sử giao dịch trong quá khứ",
      "Hoàn toàn không thể làm gì nếu không có mật khẩu đăng nhập ứng dụng"
    ],
    correctIndex: 0, // A
  },

  // 46. [Khó]
  {
    id: 46,
    difficulty: "hard",
    question: "Ví lạnh phần cứng (Hardware Wallet) bảo vệ an toàn cho tài sản người dùng vượt trội hơn ví phần mềm nhờ cơ chế vật lý nào?",
    options: [
      "Vì ví phần cứng hoàn toàn không sử dụng thuật toán băm",
      "Khóa riêng Private Key được cô lập bên trong chip bảo mật phần cứng (Secure Element); quá trình ký số diễn ra nội bộ và khóa không bao giờ lộ ra máy tính",
      "Vì ví phần cứng luôn luôn duy trì kết nối trực tuyến với thợ đào",
      "Vì ví phần cứng không cần sử dụng Seed Phrase"
    ],
    correctIndex: 1, // B
  },

  // 47. [Khó]
  {
    id: 47,
    difficulty: "hard",
    question: "Cuộc tấn công nghịch lý ngày sinh (Birthday Attack) trong mật mã học chủ yếu nhắm vào việc tìm kiếm điểm yếu nào?",
    options: [
      "Bẻ khóa thuật toán RSA bằng liên phân số",
      "Đánh cắp dấu thời gian Timestamp",
      "Tìm kiếm va chạm (Collision) của hàm băm với độ phức tạp tính toán chỉ khoảng 2^(n/2) phép thử",
      "Thay đổi cấu trúc của cây Merkle"
    ],
    correctIndex: 2, // C
  },

  // 48. [Khó]
  {
    id: 48,
    difficulty: "hard",
    question: "Thuật toán máy tính lượng tử Shor (Shor's Algorithm) sẽ đe dọa làm sụp đổ mạnh nhất loại hình mật mã nào đang bảo vệ blockchain hiện nay?",
    options: [
      "Hàm băm mật mã SHA-256",
      "Thuật toán mã hóa đối xứng AES-256",
      "Cấu trúc cây dữ liệu Merkle Tree",
      "Hệ mật mã khóa công khai bất đối xứng dựa trên bài toán phân tích số nguyên (RSA) và logarit rời rạc trên đường cong Elliptic (ECDSA/ECC)"
    ],
    correctIndex: 3, // D
  },

  // 49. [Khó]
  {
    id: 49,
    difficulty: "hard",
    question: "Phát biểu nào sau đây mô tả đúng đắn và chính xác nhất về bản chất của quy trình Kiểm toán Smart Contract (Security Audit)?",
    options: [
      "Audit là bước đánh giá chuyên sâu độc lập nhằm giảm thiểu rủi ro và phát hiện lỗ hổng tiềm ẩn, nhưng không thể đảm bảo an toàn tuyệt đối 100%",
      "Audit là bước có thể thay thế hoàn toàn công tác kiểm thử (Testing) của đội ngũ phát triển",
      "Audit có khả năng ngăn chặn hoàn toàn cuộc tấn công 51% hashrate",
      "Audit là quá trình tự động tạo ra cây Merkle Root cho hợp đồng"
    ],
    correctIndex: 0, // A
  },

  // 50. [Khó]
  {
    id: 50,
    difficulty: "hard",
    question: "Bức tường phòng thủ an ninh mạnh mẽ và bền vững nhất trong một mạng lưới Blockchain đến từ yếu tố nào?",
    options: [
      "Chỉ cần bảo vệ thật tốt một chiếc chìa khóa Private Key duy nhất",
      "Sự kết hợp đồng bộ, chặt chẽ giữa thuật toán mật mã vững chắc, mạng lưới Full Node phân tán rộng rãi, cơ chế đồng thuận kinh tế và ý thức bảo mật của người dùng",
      "Chỉ dựa hoàn toàn vào thuật toán hàm băm SHA-256",
      "Chỉ dựa vào các máy chủ của các sàn giao dịch tập trung"
    ],
    correctIndex: 1, // B
  }
];
