import type { QuizQuestionItem } from "./hashSha256Questions";

/**
 * Bộ 50 câu hỏi trắc nghiệm chủ đề "Cơ bản Blockchain"
 * Phân bố chuẩn theo tài liệu:
 * - Phần I – Mức độ Dễ: 20 câu
 * - Phần II – Mức độ Vừa: 20 câu
 * - Phần III – Mức độ Khó: 10 câu
 * 
 * Phân bố đáp án đúng:
 * A (index 0): 13 câu
 * B (index 1): 13 câu
 * C (index 2): 12 câu
 * D (index 3): 12 câu
 * Tổng: 50 câu
 */
export const BLOCKCHAIN_BASICS_50_QUESTIONS: QuizQuestionItem[] = [
  // --- PHẦN I – MỨC ĐỘ DỄ (20 câu) ---
  // 1. [Dễ]
  {
    id: 1,
    difficulty: "easy",
    question: "Công nghệ Blockchain về bản chất là gì?",
    options: [
      "Hệ điều hành máy tính thế hệ mới",
      "Cơ sở dữ liệu sổ cái phân tán được liên kết chặt chẽ bằng mật mã học",
      "Thuật toán nén dữ liệu hình ảnh",
      "Cơ sở dữ liệu tập trung đặt tại máy chủ trung tâm"
    ],
    correctIndex: 1, // B
  },
  // 2. [Dễ]
  {
    id: 2,
    difficulty: "easy",
    question: "Mỗi block trong chuỗi khối luôn luôn chứa thành phần nào để liên kết với khối đứng trước?",
    options: [
      "Bộ nhớ RAM của máy chủ",
      "Bộ xử lý đồ họa GPU",
      "Previous Block Hash (mã băm của block trước)",
      "Cookie phiên duyệt web"
    ],
    correctIndex: 2, // C
  },
  // 3. [Dễ]
  {
    id: 3,
    difficulty: "easy",
    question: "Mạng lưới Blockchain thuộc loại kiến trúc hệ thống nào sau đây?",
    options: [
      "Hệ thống phi tập trung (Decentralized System)",
      "Hệ thống tập trung (Centralized System)",
      "Hệ thống đơn máy (Single-node System)",
      "Hệ thống chỉ có phía máy khách (Client-only System)"
    ],
    correctIndex: 0, // A
  },
  // 4. [Dễ]
  {
    id: 4,
    difficulty: "easy",
    question: "Thuật ngữ DLT trong công nghệ chuỗi khối là từ viết tắt của cụm từ tiếng Anh nào?",
    options: [
      "Digital Ledger Token",
      "Data Link Transfer",
      "Distributed Logic Tool",
      "Distributed Ledger Technology (Công nghệ sổ cái phân tán)"
    ],
    correctIndex: 3, // D
  },
  // 5. [Dễ]
  {
    id: 5,
    difficulty: "easy",
    question: "Nhân vật hoặc nhóm ẩn danh nào được xem là tác giả khai sinh ra giao thức Bitcoin vào năm 2008?",
    options: [
      "Vitalik Buterin",
      "Satoshi Nakamoto",
      "Elon Musk",
      "Hal Finney"
    ],
    correctIndex: 1, // B
  },
  // 6. [Dễ]
  {
    id: 6,
    difficulty: "easy",
    question: "Khối đầu tiên khởi nguồn của một mạng lưới Blockchain được gọi là gì?",
    options: [
      "Genesis Block (Khối khởi nguồn / Block 0)",
      "Terminus Block (Khối kết thúc)",
      "Reward Block (Khối trả thưởng)",
      "Error Block (Khối lỗi)"
    ],
    correctIndex: 0, // A
  },
  // 7. [Dễ]
  {
    id: 7,
    difficulty: "easy",
    question: "Khái niệm 'Sổ cái' (Ledger) trong công nghệ blockchain được sử dụng nhằm mục đích chính là gì?",
    options: [
      "Phát trực tuyến video",
      "Tạo mật khẩu cho các ứng dụng",
      "Ghi chép và lưu trữ lịch sử các giao dịch kinh tế một cách minh bạch",
      "Tăng dung lượng lưu trữ cho ổ cứng máy tính"
    ],
    correctIndex: 2, // C
  },
  // 8. [Dễ]
  {
    id: 8,
    difficulty: "easy",
    question: "Một mạng Blockchain công khai (Public Blockchain) có đặc điểm mở nào sau đây?",
    options: [
      "Chỉ các tổ chức ngân hàng mới có quyền truy cập",
      "Chỉ người sáng lập mạng mới được đọc dữ liệu",
      "Chỉ các máy đào có bản quyền mới được tham gia",
      "Bất kỳ ai có kết nối Internet đều có thể tham gia đọc và gửi giao dịch tự do"
    ],
    correctIndex: 3, // D
  },
  // 9. [Dễ]
  {
    id: 9,
    difficulty: "easy",
    question: "Trường Previous Hash trong tiêu đề khối có vai trò cốt lõi là gì?",
    options: [
      "Liên kết mật mã khối hiện tại với khối đứng trước nó để tạo thành chuỗi bất biến",
      "Mã hóa địa chỉ ví của người gửi",
      "Khai thác coin mới tự động",
      "Đóng vai trò như một mật khẩu phiên"
    ],
    correctIndex: 0, // A
  },
  // 10. [Dễ]
  {
    id: 10,
    difficulty: "easy",
    question: "Phần thân khối (Block Body) trong cấu trúc một block thường chứa thông tin gì?",
    options: [
      "Cấu hình phần cứng CPU của máy đào",
      "Danh sách các giao dịch (Transactions) được đóng gói trong khối",
      "Mật khẩu tài khoản ngân hàng",
      "Địa chỉ IP máy chủ DNS"
    ],
    correctIndex: 1, // B
  },
  // 11. [Dễ]
  {
    id: 11,
    difficulty: "easy",
    question: "Công nghệ Blockchain giúp gia tăng mạnh mẽ tính chất nào đối với dữ liệu giao dịch?",
    options: [
      "Tính độc quyền dữ liệu",
      "Tính bí mật tuyệt đối không thể kiểm chứng",
      "Tính minh bạch (Transparency) và khả năng kiểm toán công khai",
      "Tính nén dữ liệu video"
    ],
    correctIndex: 2, // C
  },
  // 12. [Dễ]
  {
    id: 12,
    difficulty: "easy",
    question: "Theo thiết kế ban đầu trong Sách trắng (Whitepaper) năm 2008, Bitcoin chủ yếu đóng vai trò là gì?",
    options: [
      "Một mạng xã hội chia sẻ hình ảnh",
      "Một dịch vụ thư điện tử bảo mật",
      "Một hệ thống lưu trữ đám mây phân tán",
      "Hệ thống tiền mặt điện tử ngang hàng (Peer-to-Peer Electronic Cash System)"
    ],
    correctIndex: 3, // D
  },
  // 13. [Dễ]
  {
    id: 13,
    difficulty: "easy",
    question: "Điểm khác biệt cơ bản nhất giữa Blockchain và cơ sở dữ liệu quan hệ truyền thống (SQL) là gì?",
    options: [
      "Dữ liệu trong blockchain được tổ chức thành chuỗi các block liên kết bằng mật mã và có tính bất biến",
      "Blockchain không lưu trữ bất kỳ loại dữ liệu nào",
      "Cơ sở dữ liệu truyền thống không cần kết nối mạng",
      "Blockchain không thể chạy được trên máy vi tính"
    ],
    correctIndex: 0, // A
  },
  // 14. [Dễ]
  {
    id: 14,
    difficulty: "easy",
    question: "Trường Timestamp trong Block Header có nhiệm vụ gì?",
    options: [
      "Tạo cặp khóa bí mật cho các node",
      "Ghi nhận thời điểm khối được thợ đào tạo ra",
      "Tăng dung lượng bộ nhớ RAM của mạng",
      "Tự động giải bài toán Proof of Work"
    ],
    correctIndex: 1, // B
  },
  // 15. [Dễ]
  {
    id: 15,
    difficulty: "easy",
    question: "Blockchain ứng dụng các kỹ thuật mật mã học (như hàm băm, chữ ký số) nhằm mục đích chủ yếu gì?",
    options: [
      "Tăng tốc độ khung hình (FPS) cho card đồ họa",
      "Giảm dung lượng ổ đĩa về 0",
      "Bảo vệ tính toàn vẹn và xác thực quyền sở hữu tài sản của người dùng",
      "Thay thế hoàn toàn mạng cáp quang Internet"
    ],
    correctIndex: 2, // C
  },
  // 16. [Dễ]
  {
    id: 16,
    difficulty: "easy",
    question: "Khái niệm 'Node' (Nút mạng) trong hệ thống Blockchain được hiểu là gì?",
    options: [
      "Mã PIN đăng nhập ví cá nhân",
      "Tên gọi của khối Genesis",
      "Cây Merkle của giao dịch",
      "Một thiết bị máy tính kết nối và tham gia vào việc duy trì hoặc xác thực mạng blockchain"
    ],
    correctIndex: 3, // D
  },
  // 17. [Dễ]
  {
    id: 17,
    difficulty: "easy",
    question: "Vùng nhớ đệm Mempool (Memory Pool) của một node là nơi lưu trữ cái gì?",
    options: [
      "Các giao dịch hợp lệ vừa được phát sóng nhưng chưa được đóng gói vào block",
      "Các block đã được đào thành công trong quá khứ",
      "Khóa riêng Private Key của thợ đào",
      "Toàn bộ mã nguồn hệ điều hành Linux"
    ],
    correctIndex: 0, // A
  },
  // 18. [Dễ]
  {
    id: 18,
    difficulty: "easy",
    question: "Các khối trong chuỗi blockchain được kết nối thành chuỗi mắt xích liên tục nhờ thành phần nào?",
    options: [
      "Sóng Wi-Fi cục bộ",
      "Giá trị băm của khối trước (Previous Hash)",
      "Cáp kết nối USB",
      "Địa chỉ MAC của card mạng"
    ],
    correctIndex: 1, // B
  },
  // 19. [Dễ]
  {
    id: 19,
    difficulty: "easy",
    question: "Trong cấu trúc Blockchain, dữ liệu mới được thêm vào hệ thống bằng phương thức nào?",
    options: [
      "Ghi đè lên dữ liệu của các block cũ trong quá khứ",
      "Xóa bỏ các giao dịch đã thực hiện từ trước",
      "Chỉ ghi thêm (Append-only) bằng cách tạo ra và đóng gói vào các block mới tiếp theo",
      "Sửa đổi dấu thời gian của khối Genesis"
    ],
    correctIndex: 2, // C
  },
  // 20. [Dễ]
  {
    id: 20,
    difficulty: "easy",
    question: "Tính chất 'bất biến' (Immutability) của sổ cái Blockchain có nghĩa là gì?",
    options: [
      "Mạng blockchain không bao giờ cần lưu trữ dữ liệu",
      "Mạng không cho phép bất kỳ ai gửi giao dịch mới",
      "Mạng chỉ hoạt động được khi không có máy tính nào kết nối",
      "Dữ liệu một khi đã được ghi nhận và xác nhận trên chuỗi thì gần như không thể bị chỉnh sửa hay xóa bỏ"
    ],
    correctIndex: 3, // D
  },

  // --- PHẦN II – MỨC ĐỘ VỪA (20 câu) ---
  // 21. [Vừa]
  {
    id: 21,
    difficulty: "medium",
    question: "Một hệ thống tập trung (Centralized System) có đặc điểm nổi bật nào sau đây?",
    options: [
      "Mọi dữ liệu và quyền quyết định đều phụ thuộc vào một máy chủ hoặc cơ quan trung tâm duy nhất",
      "Tất cả các máy trạm đều có quyền lực ngang hàng hoàn hảo",
      "Hệ thống không sử dụng máy chủ nào",
      "Dữ liệu được sao chép đồng đều cho toàn bộ người dùng trên thế giới"
    ],
    correctIndex: 0, // A
  },
  // 22. [Vừa]
  {
    id: 22,
    difficulty: "medium",
    question: "Hệ thống phân tán (Distributed) khác biệt căn bản với hệ thống phi tập trung (Decentralized) ở điểm nào?",
    options: [
      "Hai khái niệm này hoàn toàn giống hệt nhau không có điểm khác",
      "Hệ thống phân tán có thể vẫn chịu sự kiểm soát của một thực thể điều phối trung tâm; hệ thống phi tập trung không có thực thể điều khiển duy nhất",
      "Hệ thống phân tán không sử dụng máy tính",
      "Hệ thống phi tập trung không cho phép kết nối mạng"
    ],
    correctIndex: 1, // B
  },
  // 23. [Vừa]
  {
    id: 23,
    difficulty: "medium",
    question: "Mạng ngang hàng Peer-to-Peer (P2P) trong Blockchain hoạt động theo cơ chế nào?",
    options: [
      "Mọi thông tin bắt buộc phải chuyển qua máy chủ trung tâm của ngân hàng",
      "Các thông tin được gửi thông qua cơ quan chứng thực thời gian TSA",
      "Các node giao tiếp, truyền tải và đồng bộ dữ liệu trực tiếp với nhau mà không qua trung gian",
      "Chỉ cho phép liên lạc thông qua dịch vụ đám mây của một công ty duy nhất"
    ],
    correctIndex: 2, // C
  },
  // 24. [Vừa]
  {
    id: 24,
    difficulty: "medium",
    question: "Yếu tố kỹ thuật nào khiến cho dữ liệu trên Blockchain cực kỳ khó bị chỉnh sửa hay làm giả?",
    options: [
      "Dung lượng bộ nhớ RAM của các node rất lớn",
      "Tốc độ xử lý của card màn hình GPU",
      "Mạng lưới sử dụng mạng không dây tầm xa",
      "Mỗi khối đều liên kết mật mã với khối trước bằng chuỗi hash; sửa 1 block sẽ làm sai toàn bộ chuỗi phía sau"
    ],
    correctIndex: 3, // D
  },
  // 25. [Vừa]
  {
    id: 25,
    difficulty: "medium",
    question: "Để đảm bảo thứ tự trước sau của các sự kiện kinh tế, một sổ cái blockchain cần có yếu tố nào?",
    options: [
      "Mốc thời gian (Timestamp) rõ ràng và thứ tự liên kết logic giữa các khối",
      "Bỏ qua hoàn toàn việc ghi nhận ngày giờ",
      "Tự động xóa các giao dịch sau 30 ngày",
      "Giữ bí mật toàn bộ thông tin đối với tất cả thành viên"
    ],
    correctIndex: 0, // A
  },
  // 26. [Vừa]
  {
    id: 26,
    difficulty: "medium",
    question: "Thuật ngữ 'Blockchain Layer 1' dùng để chỉ thành phần nào trong hệ sinh thái chuỗi khối?",
    options: [
      "Ứng dụng ví lưu trữ trên điện thoại thông minh",
      "Chuỗi khối nền tảng cơ sở (Base chain như Bitcoin, Ethereum) tự chịu trách nhiệm về an ninh và đồng thuận",
      "Hàm băm SHA-256",
      "Cây cấu trúc Merkle Tree"
    ],
    correctIndex: 1, // B
  },
  // 27. [Vừa]
  {
    id: 27,
    difficulty: "medium",
    question: "Các nỗ lực tạo ra tiền tệ kỹ thuật số trước Bitcoin (như DigiCash, B-money) phần lớn gặp thất bại vì bài toán nan giải nào?",
    options: [
      "Tốc độ xử lý mạng quá nhanh",
      "Chưa có mạng cáp quang kết nối xuyên quốc gia",
      "Vấn đề chi tiêu hai lần (Double Spending Problem) khi không có máy chủ trung tâm",
      "Các hàm băm thời đó chưa có tính ngẫu nhiên"
    ],
    correctIndex: 2, // C
  },
  // 28. [Vừa]
  {
    id: 28,
    difficulty: "medium",
    question: "Vấn nạn 'Chi tiêu hai lần' (Double Spending) trong tài sản kỹ thuật số được hiểu là gì?",
    options: [
      "Người dùng thực hiện mua sắm tại hai cửa hàng khác nhau",
      "Người dùng sở hữu hai tài khoản ngân hàng cùng lúc",
      "Hai thợ đào cùng nhận một phần thưởng khối",
      "Một lượng tiền kỹ thuật số duy nhất bị kẻ gian sao chép và tiêu xài gian lận cho hai giao dịch khác nhau"
    ],
    correctIndex: 3, // D
  },
  // 29. [Vừa]
  {
    id: 29,
    difficulty: "medium",
    question: "Ưu điểm nổi bật nhất của một Blockchain công khai (Public Blockchain) đối với xã hội là gì?",
    options: [
      "Tính minh bạch công khai, bất kỳ ai cũng có thể tự mình kiểm chứng dữ liệu mà không cần phụ thuộc vào niềm tin",
      "Dữ liệu được giấu kín tuyệt đối không ai đọc được",
      "Mạng lưới không cần sự tham gia của các máy tính node",
      "Không cần sử dụng đường truyền mạng Internet"
    ],
    correctIndex: 0, // A
  },
  // 30. [Vừa]
  {
    id: 30,
    difficulty: "medium",
    question: "Nếu trường Previous Hash của một khối bất kỳ bị chỉnh sửa thì hậu quả trực tiếp sẽ là gì?",
    options: [
      "Không có ảnh hưởng nào xảy ra",
      "Mối liên kết mật mã bị phá vỡ và toàn bộ các khối tiếp theo trong chuỗi sẽ bị xem là không hợp lệ",
      "Chỉ có số lượng Nonce bị thay đổi",
      "Chỉ có Merkle Root bị đặt lại về 0"
    ],
    correctIndex: 1, // B
  },
  // 31. [Vừa]
  {
    id: 31,
    difficulty: "medium",
    question: "Nhiệm vụ chính yếu nhất của ứng dụng ví tiền mã hóa (Crypto Wallet) là gì?",
    options: [
      "Đóng vai trò là cỗ máy đào coin trực tiếp",
      "Tự động tạo ra các khối blockchain mới",
      "Quản lý cặp khóa bảo mật (Public Key/Private Key) và ký số duyệt các giao dịch gửi đi",
      "Lưu trữ toàn bộ hàng trăm Gigabyte dữ liệu chuỗi khối"
    ],
    correctIndex: 2, // C
  },
  // 32. [Vừa]
  {
    id: 32,
    difficulty: "medium",
    question: "Nút đầy đủ (Full Node) khác với Nút nhẹ (Lightweight / SPV Node) ở đặc tính quan trọng nào?",
    options: [
      "Cả hai loại nút đều có chức năng lưu trữ giống hệt nhau",
      "Nút nhẹ lưu nhiều dữ liệu hơn Full Node",
      "Full Node không có khả năng xác thực giao dịch",
      "Full Node lưu trữ toàn bộ lịch sử sổ cái và độc lập xác minh mọi quy tắc; Nút nhẹ chỉ lưu Block Header"
    ],
    correctIndex: 3, // D
  },
  // 33. [Vừa]
  {
    id: 33,
    difficulty: "medium",
    question: "Mô hình Bể đào (Mining Pool) mang lại lợi ích gì cho các thợ đào cá nhân?",
    options: [
      "Tập hợp sức mạnh hashrate của nhiều thợ đào để tăng tần suất tìm thấy block và chia thưởng đều đặn theo công sức",
      "Làm giảm số lượng node đang hoạt động trong mạng",
      "Xóa bớt các khối cũ để tiết kiệm ổ cứng",
      "Tự động tăng thời gian tạo khối lên gấp 10 lần"
    ],
    correctIndex: 0, // A
  },
  // 34. [Vừa]
  {
    id: 34,
    difficulty: "medium",
    question: "Mô hình Blockchain riêng tư (Private Blockchain / Permissioned) thường phù hợp nhất với đối tượng nào?",
    options: [
      "Hệ thống tiền mã hóa phi tập trung toàn cầu như Bitcoin",
      "Các doanh nghiệp, tập đoàn hoặc liên minh tổ chức cần kiểm soát chặt chẽ quyền truy cập và bảo mật nội bộ",
      "Hệ thống gửi thư điện tử công cộng",
      "Mạng chia sẻ tệp tin công cộng"
    ],
    correctIndex: 1, // B
  },
  // 35. [Vừa]
  {
    id: 35,
    difficulty: "medium",
    question: "Trong cấu trúc của Block Header, Merkle Root đại diện trực tiếp cho thành phần nào?",
    options: [
      "Địa chỉ ví của thợ đào tìm ra khối",
      "Mã băm của khối trước đó",
      "Một mã hash đại diện tóm tắt cho toàn bộ danh sách các giao dịch được bao gồm trong khối",
      "Dấu thời gian Timestamp"
    ],
    correctIndex: 2, // C
  },
  // 36. [Vừa]
  {
    id: 36,
    difficulty: "medium",
    question: "Thành phần Timestamp (Dấu thời gian) trong khối giúp hệ sinh thái blockchain điều gì?",
    options: [
      "Mã hóa khóa riêng của người nhận",
      "Tăng dung lượng lưu trữ của bộ nhớ RAM",
      "Tăng tốc độ băng thông của cáp quang",
      "Xác minh thứ tự thời gian tạo khối và hỗ trợ cơ chế điều chỉnh độ khó định kỳ"
    ],
    correctIndex: 3, // D
  },
  // 37. [Vừa]
  {
    id: 37,
    difficulty: "medium",
    question: "Blockchain thay thế sự cần thiết của 'niềm tin mù quáng vào con người' bằng yếu tố khoa học nào?",
    options: [
      "Các thuật toán mật mã học và cơ chế đồng thuận toán học minh bạch (Trust by Computation / Math)",
      "Sự đảm bảo qua lời hứa của ngân hàng",
      "Niềm tin vào một công ty phần mềm duy nhất",
      "Hệ thống máy chủ tập trung của nhà nước"
    ],
    correctIndex: 0, // A
  },
  // 38. [Vừa]
  {
    id: 38,
    difficulty: "medium",
    question: "Đặc điểm lưu trữ dữ liệu của Blockchain thuộc loại nào sau đây?",
    options: [
      "Cho phép tùy ý ghi đè và chỉnh sửa bản ghi cũ",
      "Cơ chế chỉ ghi thêm (Append-only), không cho phép sửa đổi hay xóa bỏ các bản ghi lịch sử",
      "Tự động xóa sạch dữ liệu sau mỗi 24 giờ",
      "Liên tục nén và xóa các tài khoản không hoạt động"
    ],
    correctIndex: 1, // B
  },
  // 39. [Vừa]
  {
    id: 39,
    difficulty: "medium",
    question: "Hệ thống nào sau đây là một ví dụ điển hình của mô hình hệ thống tập trung (Centralized)?",
    options: [
      "Mạng lưới tiền tệ Bitcoin",
      "Mạng hợp đồng thông minh Ethereum",
      "Máy chủ Wikipedia hoặc cổng thông tin doanh nghiệp tập trung",
      "Mạng lưu trữ phân tán IPFS"
    ],
    correctIndex: 2, // C
  },
  // 40. [Vừa]
  {
    id: 40,
    difficulty: "medium",
    question: "Hệ thống nào sau đây là một ví dụ điển hình của mô hình hệ thống phi tập trung (Decentralized)?",
    options: [
      "Dịch vụ thư điện tử Gmail",
      "Máy chủ cơ sở dữ liệu Microsoft SQL Server",
      "Dịch vụ lưu trữ đám mây Dropbox",
      "Mạng lưới chuỗi khối Bitcoin"
    ],
    correctIndex: 3, // D
  },

  // --- PHẦN III – MỨC ĐỘ KHÓ (10 câu) ---
  // 41. [Khó]
  {
    id: 41,
    difficulty: "hard",
    question: "Vì sao mạng lưới Blockchain có thể hoạt động trơn tru mà không cần một bên thứ ba đáng tin cậy (Trusted Third Party)?",
    options: [
      "Vì cơ chế đồng thuận phân tán và mật mã học cho phép các node tự động đạt thỏa thuận mà không cần trung gian",
      "Vì hệ thống có các siêu card đồ họa GPU tự động ra quyết định",
      "Vì kích thước của mỗi block là vô hạn",
      "Vì tốc độ kết nối Wi-Fi giữa các node rất nhanh"
    ],
    correctIndex: 0, // A
  },
  // 42. [Khó]
  {
    id: 42,
    difficulty: "hard",
    question: "Nếu trường Previous Hash của một khối trong quá khứ bị kẻ tấn công sửa đổi, kẻ đó phải làm gì để khối đó được mạng chấp nhận?",
    options: [
      "Chỉ cần sửa lại giá trị Merkle Root của khối đó",
      "Phải đào lại PoW cho khối đó và toàn bộ các khối tiếp theo, đồng thời vượt qua hashrate của toàn mạng",
      "Chỉ cần cập nhật lại trường Timestamp",
      "Xóa sạch vùng nhớ đệm Mempool"
    ],
    correctIndex: 1, // B
  },
  // 43. [Khó]
  {
    id: 43,
    difficulty: "hard",
    question: "Tại sao công nghệ sổ cái Blockchain rất phù hợp để lưu trữ dữ liệu giao dịch tài chính nhưng lại KHÔNG phù hợp để lưu trữ trực tiếp các tệp video nặng?",
    options: [
      "Vì video không thể tạo ra mã hash",
      "Vì dữ liệu video không thể gắn dấu thời gian",
      "Vì dung lượng video quá lớn, việc nhân bản lưu trữ trên hàng vạn full node sẽ làm phình to sổ cái và gây nghẽn mạng nghiêm trọng",
      "Vì mạng blockchain không cho phép kết nối máy tính"
    ],
    correctIndex: 2, // C
  },
  // 44. [Khó]
  {
    id: 44,
    difficulty: "hard",
    question: "Thuộc tính nào sau đây HOÀN TOÀN KHÔNG PHẢI là mục tiêu thiết kế ban đầu của công nghệ Blockchain?",
    options: [
      "Phi tập trung hóa quyền lực (Decentralization)",
      "Bảo đảm tính toàn vẹn dữ liệu (Integrity)",
      "Minh bạch và có thể kiểm chứng (Transparency)",
      "Thuật toán nén dữ liệu tập tin dung lượng lớn (Data Compression)"
    ],
    correctIndex: 3, // D
  },
  // 45. [Khó]
  {
    id: 45,
    difficulty: "hard",
    question: "Vì sao cơ chế lưu trữ của blockchain được gọi là cấu trúc 'chỉ ghi thêm' (Append-only)?",
    options: [
      "Vì dữ liệu mới chỉ được bổ sung vào cuối chuỗi qua các khối mới, dữ liệu quá khứ không thể bị sửa đổi hay ghi đè",
      "Vì các block cũ sẽ tự động bị xóa đi sau mỗi tháng",
      "Vì các giao dịch có thể được sửa chữa tự do bởi thợ đào",
      "Vì người dùng chỉ có thể thay đổi Merkle Root"
    ],
    correctIndex: 0, // A
  },
  // 46. [Khó]
  {
    id: 46,
    difficulty: "hard",
    question: "Một nút ví nhẹ (Lightweight / SPV Node) có thể xác minh chắc chắn một giao dịch nằm trong khối nhờ vào hai thành phần nào?",
    options: [
      "Địa chỉ IP máy chủ và mã PIN cá nhân",
      "Tiêu đề khối (Block Header) chứa Merkle Root kết hợp với bằng chứng Merkle Proof của giao dịch",
      "Toàn bộ lịch sử các khối từ khối Genesis",
      "Khóa riêng Private Key của thợ đào tìm ra khối"
    ],
    correctIndex: 1, // B
  },
  // 47. [Khó]
  {
    id: 47,
    difficulty: "hard",
    question: "Khái niệm 'Đồng hồ toàn cục duy nhất' (Global Clock) thường tồn tại ở hệ thống nào và là thách thức của hệ thống nào?",
    options: [
      "Hệ thống phi tập trung có đồng hồ toàn cục tuyệt đối",
      "Mạng ngang hàng P2P có đồng hồ toàn cục dễ dàng",
      "Hệ thống tập trung có đồng hồ toàn cục; còn hệ thống phân tán không có đồng hồ chung mà phải giải quyết thứ tự sự kiện",
      "Các nút ví nhẹ SPV luôn tạo ra đồng hồ toàn cục"
    ],
    correctIndex: 2, // C
  },
  // 48. [Khó]
  {
    id: 48,
    difficulty: "hard",
    question: "Sự kết hợp giữa hai cơ chế cốt lõi nào tạo nên tính bất biến (Immutability) mạnh mẽ nhất cho sổ cái Blockchain?",
    options: [
      "Card đồ họa GPU mạnh mẽ và dung lượng ổ cứng",
      "Khóa riêng Private Key và dấu thời gian Timestamp",
      "Hệ điều hành máy chủ và địa chỉ IP tĩnh",
      "Liên kết hàm băm mật mã học (Cryptographic Hash) giữa các khối kết hợp với Thuật toán đồng thuận phân tán (Consensus Mechanism)"
    ],
    correctIndex: 3, // D
  },
  // 49. [Khó]
  {
    id: 49,
    difficulty: "hard",
    question: "Nếu hai thợ đào tìm thấy hai khối hợp lệ tại cùng một độ cao gần như đồng thời ở hai nơi khác nhau trên thế giới, điều gì xảy ra?",
    options: [
      "Xuất hiện sự phân nhánh tạm thời (Temporary Fork), mạng lưới sẽ tiếp tục phát triển và chọn nhánh dài nhất có nhiều công việc nhất",
      "Toàn bộ mạng blockchain sẽ lập tức dừng hoạt động",
      "Tất cả các khối trong quá khứ bị xóa sạch",
      "Toàn bộ số coin thưởng sẽ bị tiêu hủy"
    ],
    correctIndex: 0, // A
  },
  // 50. [Khó]
  {
    id: 50,
    difficulty: "hard",
    question: "Bản chất cốt lõi của công nghệ Blockchain là sự kết hợp hài hòa giữa ba trụ cột nền tảng nào?",
    options: [
      "Cơ sở dữ liệu SQL, giao thức RSA và cáp quang Wi-Fi",
      "Sổ cái phân tán (DLT) + Mật mã học (Cryptography) + Cơ chế đồng thuận (Consensus Mechanism)",
      "Bộ vi xử lý CPU, card đồ họa GPU và mạng Internet",
      "Mạng xã hội, thư điện tử và ví tiền mã hóa"
    ],
    correctIndex: 1, // B
  }
];
