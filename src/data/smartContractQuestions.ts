import type { QuizQuestionItem } from "./hashSha256Questions";

/**
 * Bộ 50 câu hỏi trắc nghiệm chủ đề "Smart Contract"
 * Phân bố chuẩn theo tài liệu:
 * - Phần I – Mức độ Dễ: 20 câu (Câu 1 - 20)
 * - Phần II – Mức độ Vừa: 20 câu (Câu 21 - 40)
 * - Phần III – Mức độ Khó: 10 câu (Câu 41 - 50)
 * 
 * Phân bố đáp án đúng đồng đều và ngẫu nhiên:
 * A (index 0): 13 câu
 * B (index 1): 13 câu
 * C (index 2): 12 câu
 * D (index 3): 12 câu
 * Tổng: 50 câu
 */
export const SMART_CONTRACT_50_QUESTIONS: QuizQuestionItem[] = [
  // ==========================================
  // PHẦN I – MỨC ĐỘ DỄ (20 CÂU)
  // ==========================================

  // 1. [Dễ]
  {
    id: 1,
    difficulty: "easy",
    question: "Smart Contract (Hợp đồng thông minh) về bản chất là gì?",
    options: [
      "Một dạng ví điện tử phần cứng",
      "Một chương trình máy tính tự động thực thi trên blockchain khi thỏa mãn điều kiện",
      "Một thuật toán hàm băm mật mã",
      "Một cơ chế đồng thuận phân tán"
    ],
    correctIndex: 1, // B
  },

  // 2. [Dễ]
  {
    id: 2,
    difficulty: "easy",
    question: "Mạng lưới Blockchain nào nổi tiếng nhất và tiên phong trong việc hỗ trợ Smart Contract toàn diện?",
    options: [
      "Ethereum",
      "Litecoin",
      "Dogecoin",
      "Monero"
    ],
    correctIndex: 0, // A
  },

  // 3. [Dễ]
  {
    id: 3,
    difficulty: "easy",
    question: "Mã bytecode của Smart Contract sau khi được biên dịch và triển khai sẽ được lưu trữ ở đâu?",
    options: [
      "Cơ sở dữ liệu Microsoft SQL Server",
      "Bộ nhớ tạm trên máy tính cá nhân người dùng",
      "Lưu trữ đám mây Google Drive",
      "Lưu trữ vĩnh viễn trên sổ cái Blockchain"
    ],
    correctIndex: 3, // D
  },

  // 4. [Dễ]
  {
    id: 4,
    difficulty: "easy",
    question: "Solidity là gì trong hệ sinh thái Ethereum?",
    options: [
      "Một loại ví tiền mã hóa",
      "Một máy ảo thực thi",
      "Ngôn ngữ lập trình hướng đối tượng phổ biến nhất dùng để viết Smart Contract",
      "Một thuật toán băm dữ liệu"
    ],
    correctIndex: 2, // C
  },

  // 5. [Dễ]
  {
    id: 5,
    difficulty: "easy",
    question: "Thành phần nào chịu trách nhiệm trực tiếp thực thi mã của Smart Contract trong mạng phi tập trung?",
    options: [
      "Các ngân hàng thương mại",
      "Tất cả các node hợp lệ trong mạng (thông qua máy ảo EVM)",
      "Thiết bị định tuyến Router",
      "Cơ quan cấp dấu thời gian TSA"
    ],
    correctIndex: 1, // B
  },

  // 6. [Dễ]
  {
    id: 6,
    difficulty: "easy",
    question: "Thuật ngữ EVM trong nền tảng Ethereum là chữ viết tắt của cụm từ nào?",
    options: [
      "Event Virtual Machine",
      "Ethereum Value Model",
      "Electronic Virtual Machine",
      "Ethereum Virtual Machine (Máy ảo Ethereum)"
    ],
    correctIndex: 3, // D
  },

  // 7. [Dễ]
  {
    id: 7,
    difficulty: "easy",
    question: "Ưu điểm lớn nhất của Smart Contract là giúp loại bỏ sự phụ thuộc vào thành phần nào?",
    options: [
      "Các bên trung gian đáng tin cậy (ngân hàng, công chứng viên, bên thứ ba)",
      "Thuật toán hàm băm",
      "Cấu trúc cây Merkle Tree",
      "Ứng dụng ví tiền mã hóa"
    ],
    correctIndex: 0, // A
  },

  // 8. [Dễ]
  {
    id: 8,
    difficulty: "easy",
    question: "Địa chỉ của một Smart Contract sau khi triển khai trên Ethereum có đặc điểm gì?",
    options: [
      "Là mã khóa công khai Public Key của lập trình viên",
      "Là chuỗi Previous Hash của khối Genesis",
      "Là một địa chỉ tài khoản riêng biệt (Contract Account) trên blockchain",
      "Là giá trị Merkle Root của toàn mạng"
    ],
    correctIndex: 2, // C
  },

  // 9. [Dễ]
  {
    id: 9,
    difficulty: "easy",
    question: "Một Smart Contract trên mạng blockchain thường được kích hoạt thực thi thông qua hình thức nào?",
    options: [
      "Chờ đợi dấu thời gian Timestamp",
      "Người dùng hoặc hợp đồng khác gửi một giao dịch (Transaction) gọi hàm",
      "Chờ khối mới tự động tạo ra",
      "Khi có lệnh từ máy chủ trung tâm"
    ],
    correctIndex: 1, // B
  },

  // 10. [Dễ]
  {
    id: 10,
    difficulty: "easy",
    question: "Đặc điểm mang tính bản chất cốt lõi nhất của Smart Contract là gì?",
    options: [
      "Tính tự động thực thi minh bạch theo đúng logic mã nguồn đã định nghĩa trước",
      "Có thể tự do chỉnh sửa logic bất cứ lúc nào",
      "Chỉ chạy được ở chế độ ngoại tuyến không cần mạng",
      "Chỉ dành riêng cho thợ đào sử dụng"
    ],
    correctIndex: 0, // A
  },

  // 11. [Dễ]
  {
    id: 11,
    difficulty: "easy",
    question: "Smart Contract KHÔNG THỂ sử dụng cho mục đích nào sau đây?",
    options: [
      "Phát hành NFT và vật phẩm số",
      "Tạo ra các đồng token ERC-20",
      "Tổ chức bỏ phiếu biểu quyết phi tập trung (Voting DAO)",
      "Nâng cấp phần cứng và tăng dung lượng bộ nhớ RAM máy tính"
    ],
    correctIndex: 3, // D
  },

  // 12. [Dễ]
  {
    id: 12,
    difficulty: "easy",
    question: "Sau khi hợp đồng thông minh được triển khai (Deploy) thành công, mã bytecode của nó tồn tại ở đâu?",
    options: [
      "Trên máy tính cá nhân của lập trình viên",
      "Trong vùng nhớ đệm tạm thời Mempool",
      "Lưu trữ phân tán vĩnh viễn trên sổ cái Blockchain",
      "Trong tệp cơ sở dữ liệu SQL cục bộ"
    ],
    correctIndex: 2, // C
  },

  // 13. [Dễ]
  {
    id: 13,
    difficulty: "easy",
    question: "Smart Contract có khả năng quản lý và lưu giữ loại tài sản nào sau đây?",
    options: [
      "Token tiêu chuẩn, coin bản địa (ETH) và các tài sản kỹ thuật số",
      "Phần cứng vi xử lý CPU",
      "Bộ phát sóng Wi-Fi",
      "Bộ nhớ RAM của máy chủ"
    ],
    correctIndex: 0, // A
  },

  // 14. [Dễ]
  {
    id: 14,
    difficulty: "easy",
    question: "Người dùng tương tác và gọi các hàm thực thi của Smart Contract bằng phương thức nào?",
    options: [
      "Tự tăng số Nonce của máy tính",
      "Gửi một giao dịch (Transaction) chứa dữ liệu gọi hàm đến địa chỉ của hợp đồng",
      "Gửi bằng chứng Merkle Proof qua tin nhắn",
      "Thay đổi giá trị Merkle Root của khối"
    ],
    correctIndex: 1, // B
  },

  // 15. [Dễ]
  {
    id: 15,
    difficulty: "easy",
    question: "Ngôn ngữ lập trình Solidity được thiết kế với cú pháp chịu ảnh hưởng nhiều nhất từ ngôn ngữ nào?",
    options: [
      "Ngôn ngữ lập trình Python",
      "Ngôn ngữ lập trình C++",
      "Ngôn ngữ lập trình JavaScript",
      "Ngôn ngữ truy vấn cơ sở dữ liệu SQL"
    ],
    correctIndex: 2, // C
  },

  // 16. [Dễ]
  {
    id: 16,
    difficulty: "easy",
    question: "Sau khi đã triển khai lên mạng chính (Mainnet), một Smart Contract thông thường có tính chất gì?",
    options: [
      "Sẽ tự động xóa sổ sau 30 ngày",
      "Có thể tùy ý sửa đổi từng dòng mã như web truyền thống",
      "Hoàn toàn không có địa chỉ nhận tiền",
      "Có tính bất biến (Immutable), mã nguồn không thể bị chỉnh sửa trực tiếp"
    ],
    correctIndex: 3, // D
  },

  // 17. [Dễ]
  {
    id: 17,
    difficulty: "easy",
    question: "Các lệnh bytecode của Smart Contract trên mạng Ethereum được chạy trực tiếp trong môi trường nào?",
    options: [
      "Máy ảo Ethereum Virtual Machine (EVM)",
      "Hệ quản trị cơ sở dữ liệu MySQL",
      "Phần mềm định tuyến Router",
      "Trình duyệt web Chrome"
    ],
    correctIndex: 0, // A
  },

  // 18. [Dễ]
  {
    id: 18,
    difficulty: "easy",
    question: "Một Smart Contract có thể nắm giữ và sở hữu những tài sản nào sau đây?",
    options: [
      "Thẻ nhớ RAM vật lý",
      "Đồng tiền bản địa (ETH) cùng các token tiêu chuẩn (ERC-20, ERC-721)",
      "Bộ vi xử lý CPU máy đào",
      "Băng thông đường truyền Internet"
    ],
    correctIndex: 1, // B
  },

  // 19. [Dễ]
  {
    id: 19,
    difficulty: "easy",
    question: "Tại sao một Smart Contract lại có địa chỉ nhận gửi tương tự như người dùng trên Ethereum?",
    options: [
      "Vì nó là một chiếc ví cá nhân có người điều khiển",
      "Vì nó là một khối dữ liệu blockchain",
      "Vì trên Ethereum, tài khoản gồm có Externally Owned Account (EOA) và Contract Account",
      "Vì nó là một giá trị băm một chiều"
    ],
    correctIndex: 2, // C
  },

  // 20. [Dễ]
  {
    id: 20,
    difficulty: "easy",
    question: "Chi phí mà người dùng phải trả để máy tính thực thi các thao tác trong Smart Contract được gọi là gì?",
    options: [
      "Phí khai thác Mining Fee",
      "Chi phí duy trì máy chủ Network Cost",
      "Phí gốc Root Fee",
      "Phí Gas (Gas Fee)"
    ],
    correctIndex: 3, // D
  },

  // ==========================================
  // PHẦN II – MỨC ĐỘ VỪA (20 CÂU)
  // ==========================================

  // 21. [Vừa]
  {
    id: 21,
    difficulty: "medium",
    question: "Khái niệm 'Gas' trong mạng Ethereum được sử dụng nhằm mục đích chính nào?",
    options: [
      "Đo lường và chi trả cho khối lượng tài nguyên tính toán mà EVM cần để thực thi câu lệnh",
      "Làm tăng tốc độ đường truyền mạng Internet",
      "Mã hóa bảo mật toàn bộ cơ sở dữ liệu",
      "Tự động sinh ra khóa riêng Private Key"
    ],
    correctIndex: 0, // A
  },

  // 22. [Vừa]
  {
    id: 22,
    difficulty: "medium",
    question: "Thông số 'Gas Limit' được người dùng chỉ định khi gửi giao dịch mang ý nghĩa là gì?",
    options: [
      "Giá của đồng ETH tại thời điểm gửi",
      "Độ khó của thuật toán đào PoW",
      "Lượng gas tối đa mà người dùng cho phép giao dịch tiêu thụ",
      "Số lượng block tối đa trong ngày"
    ],
    correctIndex: 2, // C
  },

  // 23. [Vừa]
  {
    id: 23,
    difficulty: "medium",
    question: "Nếu một giao dịch gọi Smart Contract bị hết Gas giữa chừng (Out of Gas), điều gì sẽ xảy ra?",
    options: [
      "Hợp đồng vẫn tiếp tục thực thi hoàn tất",
      "Giao dịch thất bại và toàn bộ trạng thái (state) bị hoàn tác (revert), nhưng phí gas đã tiêu thụ không được hoàn lại",
      "Toàn bộ khối chứa giao dịch đó bị hủy bỏ",
      "Địa chỉ ví của người dùng bị khóa vĩnh viễn"
    ],
    correctIndex: 1, // B
  },

  // 24. [Vừa]
  {
    id: 24,
    difficulty: "medium",
    question: "Từ khóa 'view' trong khai báo hàm của Solidity có ý nghĩa là gì?",
    options: [
      "Hàm có quyền ghi dữ liệu mới lên blockchain",
      "Hàm chỉ dùng để tạo các sự kiện Event",
      "Hàm tạo ra khối mới",
      "Hàm chỉ đọc dữ liệu từ trạng thái (state) mà không làm thay đổi trạng thái blockchain"
    ],
    correctIndex: 3, // D
  },

  // 25. [Vừa]
  {
    id: 25,
    difficulty: "medium",
    question: "Hàm có bổ từ 'pure' khác biệt với hàm 'view' trong Solidity ở đặc điểm nào?",
    options: [
      "Hàm pure không đọc và cũng không ghi bất kỳ dữ liệu nào từ trạng thái (state) của contract",
      "Hàm pure luôn luôn bắt buộc phải tốn phí gas khi gọi",
      "Hàm pure chỉ có chức năng ghi dữ liệu",
      "Hàm pure chỉ dùng để đào block"
    ],
    correctIndex: 0, // A
  },

  // 26. [Vừa]
  {
    id: 26,
    difficulty: "medium",
    question: "Biến trạng thái (State Variable) trong Smart Contract là gì?",
    options: [
      "Biến lưu tạm thời trong bộ nhớ RAM và mất đi sau khi thực thi",
      "Biến được lưu trữ vĩnh viễn trong vùng Storage trên sổ cái blockchain",
      "Biến đại diện cho số Nonce",
      "Biến đại diện cho dấu thời gian Timestamp"
    ],
    correctIndex: 1, // B
  },

  // 27. [Vừa]
  {
    id: 27,
    difficulty: "medium",
    question: "Hàm khởi tạo (Constructor) trong hợp đồng thông minh được thực thi vào thời điểm nào?",
    options: [
      "Mỗi khi có người gửi giao dịch đến hợp đồng",
      "Khi hợp đồng bị xóa bỏ",
      "Chỉ được thực thi duy nhất một lần khi hợp đồng được triển khai (deploy) lên blockchain",
      "Khi có khối mới được đào thành công"
    ],
    correctIndex: 2, // C
  },

  // 28. [Vừa]
  {
    id: 28,
    difficulty: "medium",
    question: "Khái niệm 'Event' (Sự kiện) trong Solidity được sử dụng nhằm mục đích gì?",
    options: [
      "Mã hóa các thông điệp bảo mật",
      "Tự động tính toán hàm băm SHA-256",
      "Giải quyết bài toán đào coin",
      "Ghi nhật ký (log) lên blockchain để các ứng dụng giao diện (Frontend) có thể lắng nghe và cập nhật"
    ],
    correctIndex: 3, // D
  },

  // 29. [Vừa]
  {
    id: 29,
    difficulty: "medium",
    question: "Cấu trúc dữ liệu 'mapping' trong Solidity tương đương với cấu trúc nào trong khoa học máy tính?",
    options: [
      "Bảng băm hoặc từ điển ánh xạ cặp khóa – giá trị (Key-Value / Dictionary)",
      "Hàng đợi Queue (FIFO)",
      "Ngăn xếp Stack (LIFO)",
      "Cây nhị phân tìm kiếm"
    ],
    correctIndex: 0, // A
  },

  // 30. [Vừa]
  {
    id: 30,
    difficulty: "medium",
    question: "Modifier (bổ từ sửa đổi) trong Solidity thường được các lập trình viên sử dụng để làm gì?",
    options: [
      "Tự động đào coin",
      "Kiểm tra điều kiện tiên quyết trước khi thực thi logic hàm (ví dụ kiểm tra quyền onlyOwner)",
      "Tạo cây Merkle",
      "Khai báo các sự kiện Event"
    ],
    correctIndex: 1, // B
  },

  // 31. [Vừa]
  {
    id: 31,
    difficulty: "medium",
    question: "Tiêu chuẩn ERC-20 trên mạng Ethereum là tiêu chuẩn kỹ thuật dành cho loại tài sản nào?",
    options: [
      "Token không thể thay thế (NFT)",
      "Hệ thống ứng dụng ví lưu trữ",
      "Token có thể thay thế được (Fungible Token - ví dụ USDT, UNI)",
      "Mạng lưới Oracle dữ liệu"
    ],
    correctIndex: 2, // C
  },

  // 32. [Vừa]
  {
    id: 32,
    difficulty: "medium",
    question: "Tiêu chuẩn ERC-721 trên Ethereum là tiêu chuẩn kỹ thuật dành cho loại tài sản nào?",
    options: [
      "Đồng tiền ổn định giá Stablecoin",
      "Giao thức chuyển tiền Bitcoin",
      "Hàm băm một chiều",
      "Token không thể thay thế (Non-Fungible Token - NFT, mỗi token là duy nhất)"
    ],
    correctIndex: 3, // D
  },

  // 33. [Vừa]
  {
    id: 33,
    difficulty: "medium",
    question: "Hàm kiểm tra 'require()' trong Solidity có cơ chế hoạt động như thế nào?",
    options: [
      "Kiểm tra điều kiện; nếu điều kiện sai thì lập tức dừng thực thi, hoàn tác giao dịch và trả lại phần gas chưa dùng",
      "Tự động tạo ra một block mới",
      "Sinh khóa bí mật cho người gửi",
      "Phát ra sự kiện Event lên mạng"
    ],
    correctIndex: 0, // A
  },

  // 34. [Vừa]
  {
    id: 34,
    difficulty: "medium",
    question: "Biến toàn cục 'msg.sender' trong Solidity đại diện cho thông tin nào?",
    options: [
      "Địa chỉ của node thợ đào khối",
      "Địa chỉ ví hoặc địa chỉ hợp đồng trực tiếp gọi hàm hiện tại",
      "Địa chỉ người tạo khối Genesis",
      "Địa chỉ IP của người dùng"
    ],
    correctIndex: 1, // B
  },

  // 35. [Vừa]
  {
    id: 35,
    difficulty: "medium",
    question: "Biến toàn cục 'msg.value' trong Solidity thể hiện giá trị gì?",
    options: [
      "Số lượng gas còn lại của giao dịch",
      "Thời điểm tạo block",
      "Lượng coin bản địa (ETH tính bằng Wei) được gửi kèm theo giao dịch gọi hàm",
      "Mã hash của block trước"
    ],
    correctIndex: 2, // C
  },

  // 36. [Vừa]
  {
    id: 36,
    difficulty: "medium",
    question: "Tại sao việc phát ra Event trong Smart Contract lại tốn ít chi phí Gas hơn nhiều so với việc lưu vào State Variable?",
    options: [
      "Vì Event không sử dụng hàm băm",
      "Vì Event không được ghi vào khối",
      "Vì Event không có node xác thực",
      "Vì dữ liệu Event chỉ lưu vào nhật ký giao dịch (Log) chứ không chiếm vùng nhớ trạng thái hợp đồng (Storage)"
    ],
    correctIndex: 3, // D
  },

  // 37. [Vừa]
  {
    id: 37,
    difficulty: "medium",
    question: "Trong các mẫu thiết kế hợp đồng, quyền quản trị 'Owner' (Chủ hợp đồng) thường được gán cho ai?",
    options: [
      "Địa chỉ tài khoản (msg.sender) thực hiện triển khai (deploy) contract tại hàm constructor",
      "Bất kỳ thợ đào nào tìm thấy block",
      "Máy chủ Mining Pool lớn nhất",
      "Nhà cung cấp dữ liệu Oracle"
    ],
    correctIndex: 0, // A
  },

  // 38. [Vừa]
  {
    id: 38,
    difficulty: "medium",
    question: "Khi ứng dụng Web3 (Frontend) chỉ muốn đọc dữ liệu từ hàm view của Smart Contract, người dùng có cần ký giao dịch và trả phí gas không?",
    options: [
      "Bắt buộc phải trả phí gas như mọi giao dịch khác",
      "KHÔNG cần tạo giao dịch và KHÔNG tốn phí gas vì chỉ truy vấn cục bộ từ một node",
      "Phải trả phí gas nếu dùng trình duyệt Chrome",
      "Phải chờ thợ đào đóng gói vào block mới đọc được"
    ],
    correctIndex: 1, // B
  },

  // 39. [Vừa]
  {
    id: 39,
    difficulty: "medium",
    question: "Một Smart Contract trên mạng Ethereum có thể gọi hàm của một Smart Contract khác được không?",
    options: [
      "Hoàn toàn không thể do cơ chế bảo mật",
      "Chỉ gọi được nếu cả hai đều là token ERC-20",
      "CÓ, đây là tính chất có thể ghép nối (Composability / Money Legos) của các ứng dụng DeFi",
      "Chỉ gọi được đối với các hợp đồng NFT"
    ],
    correctIndex: 2, // C
  },

  // 40. [Vừa]
  {
    id: 40,
    difficulty: "medium",
    question: "Vùng lưu trữ dữ liệu lâu dài và tốn kém chi phí Gas nhất của một Smart Contract trong EVM là vùng nào?",
    options: [
      "Vùng nhớ tạm Memory",
      "Ngăn xếp Stack",
      "Vùng nhớ CallData",
      "Vùng lưu trữ trạng thái Storage (lưu vĩnh viễn trên sổ cái)"
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
    question: "Cuộc tấn công Reentrancy (Tấn công tái nhập) nổi tiếng trong vụ hack The DAO xảy ra khi nào?",
    options: [
      "Khi hợp đồng nạn nhân thực hiện chuyển tiền ra ngoài trước khi kịp cập nhật số dư nội bộ, cho phép kẻ xấu gọi đệ quy rút tiền liên tục",
      "Khi giá trị Merkle Root của khối bị sai lệch",
      "Khi dấu thời gian Timestamp của mạng bị nhảy cóc",
      "Khi hàm băm SHA-256 xảy ra va chạm mạnh"
    ],
    correctIndex: 0, // A
  },

  // 42. [Khó]
  {
    id: 42,
    difficulty: "hard",
    question: "Lỗ hổng tràn số (Integer Overflow / Underflow) trong Smart Contract là gì?",
    options: [
      "Hiện tượng giao dịch bị cạn kiệt gas",
      "Hiện tượng phép tính số nguyên vượt quá giới hạn lưu trữ tối đa (hoặc nhỏ hơn tối thiểu), khiến giá trị bị quay vòng",
      "Hiện tượng tiêu đề khối bị mất giá trị băm",
      "Hiện tượng khối bị xóa khỏi blockchain"
    ],
    correctIndex: 1, // B
  },

  // 43. [Khó]
  {
    id: 43,
    difficulty: "hard",
    question: "Thành phần 'Oracle' (ví dụ Chainlink) đóng vai trò gì trong hệ sinh thái Smart Contract?",
    options: [
      "Tham gia giải bài toán đào coin cho mạng",
      "Tự động tạo ra các khối Genesis mới",
      "Đóng vai trò cầu nối đưa các nguồn dữ liệu ngoài đời thực (off-chain) như giá tài sản, thời tiết vào hợp đồng",
      "Tạo địa chỉ ví cá nhân cho người dùng"
    ],
    correctIndex: 2, // C
  },

  // 44. [Khó]
  {
    id: 44,
    difficulty: "hard",
    question: "Vì sao việc sửa lỗi (bug fix) trên một Smart Contract đã triển khai lại phức tạp hơn rất nhiều so với phần mềm truyền thống?",
    options: [
      "Vì máy chủ blockchain thiếu bộ nhớ RAM",
      "Vì hệ thống thiếu kết nối mạng Internet",
      "Vì các thợ đào từ chối sửa lỗi",
      "Vì tính chất bất biến (Immutability) của blockchain: một khi đã deploy thì mã nguồn không thể bị sửa đổi trực tiếp"
    ],
    correctIndex: 3, // D
  },

  // 45. [Khó]
  {
    id: 45,
    difficulty: "hard",
    question: "Mẫu thiết kế nào là biện pháp chuẩn mực hàng đầu để ngăn chặn triệt để tấn công Reentrancy?",
    options: [
      "Mẫu thiết kế Checks-Effects-Interactions (kiểm tra điều kiện, cập nhật số dư nội bộ trước, rồi mới tương tác gửi tiền ra ngoài)",
      "Tăng mức phí Gas Limit lên gấp đôi",
      "Đổi giá trị Nonce của tài khoản",
      "Sử dụng thuật toán băm MD5"
    ],
    correctIndex: 0, // A
  },

  // 46. [Khó]
  {
    id: 46,
    difficulty: "hard",
    question: "Tại sao lệnh 'delegatecall' trong Solidity lại rất nguy hiểm nếu không được bảo vệ chặt chẽ?",
    options: [
      "Vì nó làm xóa sạch toàn bộ chuỗi blockchain",
      "Vì nó cho phép thực thi mã từ hợp đồng bên ngoài nhưng lại thao tác trực tiếp trên chính không gian lưu trữ (storage) của hợp đồng hiện tại",
      "Vì nó làm tăng kích thước của khối",
      "Vì nó tự động thay đổi thuật toán hàm băm"
    ],
    correctIndex: 1, // B
  },

  // 47. [Khó]
  {
    id: 47,
    difficulty: "hard",
    question: "Vấn đề 'Bài toán Oracle' (Oracle Problem) chỉ ra rủi ro gì đối với Smart Contract?",
    options: [
      "Chi phí gas sẽ tự động giảm về 0",
      "Giá trị Merkle Root của toàn mạng bị sụp đổ",
      "Nếu dữ liệu đầu vào từ Oracle bị sai lệch hoặc bị thao túng, Smart Contract vẫn tự động thực thi sai theo dữ liệu rác đó (Garbage in, Garbage out)",
      "Khối blockchain chứa giao dịch sẽ bị lỗi logic"
    ],
    correctIndex: 2, // C
  },

  // 48. [Khó]
  {
    id: 48,
    difficulty: "hard",
    question: "Mô hình Hợp đồng có thể nâng cấp (Upgradeable Contract) thường áp dụng mẫu thiết kế nào?",
    options: [
      "Mẫu thiết kế giảm mã băm",
      "Mẫu thiết kế loại bỏ máy ảo EVM",
      "Mẫu thiết kế tăng kích thước khối",
      "Mô hình Proxy Pattern: Proxy Contract lưu giữ dữ liệu và số dư, trong khi Implementation Contract lưu giữ logic xử lý"
    ],
    correctIndex: 3, // D
  },

  // 49. [Khó]
  {
    id: 49,
    difficulty: "hard",
    question: "Cơ chế tính phí Gas giải quyết bài toán dừng (Halting Problem) và chống lại vòng lặp vô hạn (Infinite Loop) trong EVM như thế nào?",
    options: [
      "Mỗi phép toán tiêu hao gas; khi hết gas cho phép, EVM sẽ tự động dừng thực thi và hoàn tác, ngăn kẻ xấu làm treo máy các node",
      "Nhờ dấu thời gian Timestamp tự động dừng máy",
      "Nhờ thay đổi giá trị Merkle Root",
      "Nhờ sử dụng hàm băm SHA-256 cực mạnh"
    ],
    correctIndex: 0, // A
  },

  // 50. [Khó]
  {
    id: 50,
    difficulty: "hard",
    question: "Phát biểu nào sau đây thể hiện đúng đắn và toàn diện nhất bản chất của Smart Contract?",
    options: [
      "Smart Contract có thể thay thế hoàn toàn hệ thống pháp luật và tòa án truyền thống",
      "Smart Contract là chương trình tự động hóa thực thi logic minh bạch trên blockchain, nhưng vẫn phụ thuộc vào chất lượng dữ liệu đầu vào và thiết kế mã",
      "Smart Contract luôn luôn có thể chỉnh sửa trực tiếp sau khi triển khai",
      "Smart Contract chỉ hoạt động được khi có thợ đào giải bài toán PoW"
    ],
    correctIndex: 1, // B
  }
];
