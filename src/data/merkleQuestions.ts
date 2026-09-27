import type { QuizQuestionItem } from "./hashSha256Questions";

/**
 * Bộ 50 câu hỏi trắc nghiệm chủ đề "Cây Merkle (Merkle Tree)"
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
export const MERKLE_50_QUESTIONS: QuizQuestionItem[] = [
  // --- PHẦN I – MỨC ĐỘ DỄ (20 câu) ---
  // 1. [Dễ]
  {
    id: 1,
    difficulty: "easy",
    question: "Cây Merkle (Merkle Tree) trong công nghệ blockchain được sử dụng chủ yếu để làm gì?",
    options: [
      "Mã hóa khóa bí mật của người dùng",
      "Xác minh tính toàn vẹn của dữ liệu giao dịch một cách hiệu quả",
      "Gia tăng tốc độ đào Bitcoin",
      "Tăng tốc độ đường truyền mạng Internet"
    ],
    correctIndex: 1, // B
  },
  // 2. [Dễ]
  {
    id: 2,
    difficulty: "easy",
    question: "Merkle Root (Gốc Merkle) trong cấu trúc khối là gì?",
    options: [
      "Khóa công khai của người tạo khối",
      "Giá trị băm duy nhất đại diện tóm tắt cho toàn bộ các giao dịch trong block",
      "Số nguyên Nonce dùng để đào khối",
      "Dấu thời gian Timestamp của khối"
    ],
    correctIndex: 1, // B
  },
  // 3. [Dễ]
  {
    id: 3,
    difficulty: "easy",
    question: "Trong cấu trúc cây Merkle, các nút lá (Leaf Nodes) chứa thông tin gì?",
    options: [
      "Giá trị băm (Hash) của từng giao dịch riêng lẻ",
      "Khóa công khai Public Key của thợ đào",
      "Toàn bộ thông tin tiêu đề Block Header",
      "Địa chỉ ví của người nhận tiền"
    ],
    correctIndex: 0, // A
  },
  // 4. [Dễ]
  {
    id: 4,
    difficulty: "easy",
    question: "Giá trị Merkle Root được lưu trữ tại vị trí nào trong cấu trúc của một Block?",
    options: [
      "Trong ví điện tử của người dùng",
      "Trong vùng chờ Mempool của node",
      "Nằm cố định trong Block Header (Tiêu đề khối)",
      "Nằm trong tập UTXO"
    ],
    correctIndex: 2, // C
  },
  // 5. [Dễ]
  {
    id: 5,
    difficulty: "easy",
    question: "Nếu chỉ một giao dịch duy nhất trong khối bị sửa đổi 1 ký tự, điều gì sẽ xảy ra?",
    options: [
      "Chỉ có dấu thời gian Timestamp thay đổi",
      "Cây Merkle vẫn giữ nguyên không thay đổi",
      "Chỉ có trường Nonce bị thay đổi",
      "Giá trị Merkle Root ở đỉnh cây sẽ bị thay đổi hoàn toàn"
    ],
    correctIndex: 3, // D
  },
  // 6. [Dễ]
  {
    id: 6,
    difficulty: "easy",
    question: "Cây Merkle hoạt động chủ yếu dựa trên nền tảng kỹ thuật nào sau đây?",
    options: [
      "Thuật toán hàm băm mật mã (như SHA-256)",
      "Thuật toán mã hóa bất đối xứng RSA",
      "Thuật toán mã hóa đối xứng AES",
      "Thuật toán nén dữ liệu DES"
    ],
    correctIndex: 0, // A
  },
  // 7. [Dễ]
  {
    id: 7,
    difficulty: "easy",
    question: "Trong cây Merkle nhị phân, một nút cha (Parent Node) được tạo ra bằng cách nào?",
    options: [
      "Cộng đại số giá trị của hai mã hash con",
      "Ghép hai chuỗi hash con lại với nhau rồi băm: Parent = Hash(Trái + Phải)",
      "Thực hiện phép toán XOR giữa hai hash con",
      "Đảo ngược từng bit của nút con bên trái"
    ],
    correctIndex: 1, // B
  },
  // 8. [Dễ]
  {
    id: 8,
    difficulty: "easy",
    question: "Mỗi một giao dịch (Transaction) trong khối tương ứng với bao nhiêu nút lá (Leaf Hash)?",
    options: [
      "2 nút lá",
      "4 nút lá",
      "Chính xác 1 nút lá duy nhất",
      "Không tạo ra nút lá nào"
    ],
    correctIndex: 2, // C
  },
  // 9. [Dễ]
  {
    id: 9,
    difficulty: "easy",
    question: "Cây Merkle được ứng dụng phổ biến trong Bitcoin và các chuỗi khối truyền thống có cấu trúc dạng gì?",
    options: [
      "Cây AVL cân bằng động",
      "Danh sách liên kết đơn (Linked List)",
      "Cây B+ Tree",
      "Cây nhị phân (Binary Hash Tree)"
    ],
    correctIndex: 3, // D
  },
  // 10. [Dễ]
  {
    id: 10,
    difficulty: "easy",
    question: "Vai trò quan trọng và lớn nhất của Merkle Root trong khối là gì?",
    options: [
      "Đại diện và tóm tắt toàn bộ danh sách giao dịch trong block bằng một chuỗi hash cố định",
      "Mã hóa bảo mật nội dung giao dịch",
      "Sinh cặp khóa công khai cho người tham gia",
      "Tự động tạo chữ ký số cho thợ đào"
    ],
    correctIndex: 0, // A
  },
  // 11. [Dễ]
  {
    id: 11,
    difficulty: "easy",
    question: "Cấu trúc Merkle Tree giúp hệ thống blockchain phát hiện điều gì nhanh chóng nhất?",
    options: [
      "Hiện tượng mất kết nối mạng Internet",
      "Bất kỳ hành vi chỉnh sửa hoặc giả mạo dữ liệu giao dịch nào",
      "Sự cố mất khóa riêng của ví",
      "Tập tin rác phát sinh trong hệ điều hành"
    ],
    correctIndex: 1, // B
  },
  // 12. [Dễ]
  {
    id: 12,
    difficulty: "easy",
    question: "Độ dài của giá trị Merkle Root phụ thuộc vào yếu tố nào?",
    options: [
      "Tổng số lượng giao dịch nằm trong khối",
      "Kích thước file dữ liệu của block",
      "Thuật toán hàm băm được sử dụng (ví dụ SHA-256 luôn ra 256 bit / 32 byte)",
      "Tổng số lượng thợ đào trong mạng"
    ],
    correctIndex: 2, // C
  },
  // 13. [Dễ]
  {
    id: 13,
    difficulty: "easy",
    question: "Merkle Tree giúp các nút mạng tối ưu và cắt giảm đáng kể yếu tố nào?",
    options: [
      "Tiêu hao điện năng của máy đào",
      "Số lượng khối trong toàn mạng",
      "Độ khó khai thác khối",
      "Dung lượng dữ liệu cần tải về để xác minh một giao dịch"
    ],
    correctIndex: 3, // D
  },
  // 14. [Dễ]
  {
    id: 14,
    difficulty: "easy",
    question: "Merkle Tree có phải là một thuật toán mã hóa (Encryption) hay không?",
    options: [
      "KHÔNG, Merkle Tree là cấu trúc dữ liệu hình cây sử dụng hàm băm, không có chức năng giải mã",
      "CÓ, Merkle Tree là thuật toán mã hóa đối xứng",
      "Chỉ là mã hóa khi chạy trên mạng Bitcoin",
      "Chỉ là mã hóa khi chạy trên máy chủ Ethereum"
    ],
    correctIndex: 0, // A
  },
  // 15. [Dễ]
  {
    id: 15,
    difficulty: "easy",
    question: "Nút lá (Leaf Hash) trong cây Merkle được tạo ra trực tiếp từ đâu?",
    options: [
      "Từ dấu thời gian Timestamp",
      "Băm trực tiếp từ nội dung nhị phân thô của giao dịch (Transaction data)",
      "Từ giá trị Nonce của khối",
      "Từ khóa công khai Public Key của thợ đào"
    ],
    correctIndex: 1, // B
  },
  // 16. [Dễ]
  {
    id: 16,
    difficulty: "easy",
    question: "Merkle Root có thể được sử dụng để chứng minh tính toàn vẹn của tập hợp giao dịch trong khối không?",
    options: [
      "Chỉ sử dụng được khi đi kèm thuật toán RSA",
      "Chỉ sử dụng được trong các mạng Proof of Stake",
      "CÓ, bất kỳ sự thay đổi giao dịch nào đều làm sai lệch Merkle Root",
      "KHÔNG bao giờ dùng được"
    ],
    correctIndex: 2, // C
  },
  // 17. [Dễ]
  {
    id: 17,
    difficulty: "easy",
    question: "Thành phần nào sau đây HOÀN TOÀN KHÔNG thuộc về cấu trúc của cây Merkle?",
    options: [
      "Nút lá (Leaf Hash)",
      "Nút cha trung gian (Parent Hash)",
      "Nút gốc (Merkle Root)",
      "Khóa bí mật (Private Key)"
    ],
    correctIndex: 3, // D
  },
  // 18. [Dễ]
  {
    id: 18,
    difficulty: "easy",
    question: "Hai khối blockchain có danh sách giao dịch và thứ tự giao dịch hoàn toàn giống hệt nhau sẽ có kết quả Merkle Root thế nào?",
    options: [
      "Chắc chắn sẽ có giá trị Merkle Root hoàn toàn giống nhau",
      "Có giá trị Merkle Root khác nhau vì thợ đào khác nhau",
      "Có giá trị Merkle Root khác nhau vì Timestamp khác nhau",
      "Không thể tính toán được Merkle Root"
    ],
    correctIndex: 0, // A
  },
  // 19. [Dễ]
  {
    id: 19,
    difficulty: "easy",
    question: "Ứng dụng cốt lõi của cây Merkle trong sổ cái phân tán blockchain nhằm mục đích gia tăng tính chất gì?",
    options: [
      "Dung lượng bộ nhớ RAM của máy tính",
      "Tính toàn vẹn (Integrity) và hiệu quả xác minh dữ liệu",
      "Tốc độ đường truyền cáp quang",
      "Độ dài của địa chỉ ví"
    ],
    correctIndex: 1, // B
  },
  // 20. [Dễ]
  {
    id: 20,
    difficulty: "easy",
    question: "Giá trị Merkle Root ở đỉnh cây được hình thành và tính toán tổng hợp từ đâu?",
    options: [
      "Từ mã băm của khối trước (Previous Block Hash)",
      "Từ dấu thời gian Timestamp của mạng",
      "Từ tất cả các nút lá Leaf Hash theo cơ chế ghép cặp đệ quy lên đỉnh",
      "Từ giá trị Nonce ngẫu nhiên"
    ],
    correctIndex: 2, // C
  },

  // --- PHẦN II – MỨC ĐỘ VỪA (20 câu) ---
  // 21. [Vừa]
  {
    id: 21,
    difficulty: "medium",
    question: "Bằng chứng Merkle (Merkle Proof hay Merkle Path) là gì?",
    options: [
      "Khóa bí mật Private Key của khối",
      "Toàn bộ dữ liệu của tất cả giao dịch trong block",
      "Giá trị số nguyên Nonce hợp lệ",
      "Tập hợp các mã hash anh em (sibling hashes) cần thiết trên đường đi từ nút lá lên đến Merkle Root"
    ],
    correctIndex: 3, // D
  },
  // 22. [Vừa]
  {
    id: 22,
    difficulty: "medium",
    question: "Các nút ví nhẹ SPV (Simplified Payment Verification) sử dụng Merkle Proof nhằm mục đích gì?",
    options: [
      "Xác minh giao dịch đã nằm trong block mà không cần tải toàn bộ dữ liệu blockchain",
      "Tham gia giải bài toán đào coin Proof of Work",
      "Tạo cặp khóa bí mật và khóa công khai",
      "Thay thế hoàn toàn vai trò của thợ đào"
    ],
    correctIndex: 0, // A
  },
  // 23. [Vừa]
  {
    id: 23,
    difficulty: "medium",
    question: "Nếu một block chứa chính xác 8 giao dịch, cây Merkle tương ứng sẽ có bao nhiêu nút lá?",
    options: [
      "4 nút lá",
      "8 nút lá (mỗi giao dịch tương ứng đúng một nút lá)",
      "16 nút lá",
      "2 nút lá"
    ],
    correctIndex: 1, // B
  },
  // 24. [Vừa]
  {
    id: 24,
    difficulty: "medium",
    question: "Trong giao thức Bitcoin, khi số lượng giao dịch ở một tầng là số lẻ, thuật toán Merkle xử lý nút lẻ cuối cùng như thế nào?",
    options: [
      "Xóa bỏ giao dịch lẻ đó không đưa vào block",
      "Thêm vào một giao dịch rỗng có giá trị 0 BTC",
      "Nhân đôi (duplicate) chính nút lẻ cuối cùng đó để ghép cặp tính hash cha",
      "Đảo ngược lại thứ tự toàn bộ giao dịch"
    ],
    correctIndex: 2, // C
  },
  // 25. [Vừa]
  {
    id: 25,
    difficulty: "medium",
    question: "Độ sâu (chiều cao h) của một cây Merkle nhị phân phụ thuộc trực tiếp vào yếu tố nào?",
    options: [
      "Giá trị của trường Nonce",
      "Dấu thời gian Timestamp",
      "Độ khó đào Difficulty của mạng",
      "Số lượng giao dịch (N) trong khối (h ≈ ⌈log₂(N)⌉)"
    ],
    correctIndex: 3, // D
  },
  // 26. [Vừa]
  {
    id: 26,
    difficulty: "medium",
    question: "Nếu chỉ hoán đổi vị trí của hai giao dịch trong khối (nội dung giao dịch giữ nguyên), điều gì sẽ xảy ra?",
    options: [
      "Giá trị Merkle Root chắc chắn sẽ bị thay đổi vì thứ tự đầu vào bị thay đổi",
      "Merkle Root hoàn toàn giữ nguyên không đổi",
      "Chỉ có trường Nonce bị thay đổi",
      "Chỉ có Timestamp bị thay đổi"
    ],
    correctIndex: 0, // A
  },
  // 27. [Vừa]
  {
    id: 27,
    difficulty: "medium",
    question: "Một bản Merkle Proof để chứng minh một giao dịch hợp lệ KHÔNG CẦN phải chứa thành phần nào sau đây?",
    options: [
      "Mã hash của các nút anh em",
      "Toàn bộ nội dung của tất cả các giao dịch khác trong khối",
      "Chỉ dẫn hướng ghép cặp (trái hay phải)",
      "Mã hash của nút lá cần chứng minh"
    ],
    correctIndex: 1, // B
  },
  // 28. [Vừa]
  {
    id: 28,
    difficulty: "medium",
    question: "Một nút nhẹ (SPV Node) chỉ cần lưu trữ thành phần nào trong blockchain để có thể sử dụng Merkle Proof?",
    options: [
      "Toàn bộ thân khối và lịch sử giao dịch",
      "Khóa bí mật của toàn mạng",
      "Chỉ cần chuỗi các Block Header (chứa Merkle Root) với dung lượng rất nhỏ gọn",
      "Vùng nhớ đệm Mempool"
    ],
    correctIndex: 2, // C
  },
  // 29. [Vừa]
  {
    id: 29,
    difficulty: "medium",
    question: "Việc sử dụng Merkle Tree và Merkle Proof giúp mạng lưới blockchain tiết kiệm đáng kể tài nguyên nào sau đây?",
    options: [
      "Bộ nhớ RAM của máy đào",
      "Điện năng của hệ thống làm mát",
      "Thời gian chờ đợi giải bài toán PoW",
      "Băng thông mạng truyền tải (Network Bandwidth) khi xác thực giao dịch trên thiết bị di động"
    ],
    correctIndex: 3, // D
  },
  // 30. [Vừa]
  {
    id: 30,
    difficulty: "medium",
    question: "Chỉ riêng giá trị Merkle Root có đủ để một nút kiểm tra xem giao dịch X có thuộc khối hay không?",
    options: [
      "Cần phải có thêm Merkle Proof (đường dẫn hash anh em) đi kèm thì mới tái tạo và đối chiếu với Merkle Root được",
      "Chỉ riêng Merkle Root là hoàn toàn đủ",
      "Không bao giờ kiểm tra được dù có proof",
      "Chỉ có thợ đào mới kiểm tra được"
    ],
    correctIndex: 0, // A
  },
  // 31. [Vừa]
  {
    id: 31,
    difficulty: "medium",
    question: "Trong cây Merkle, nút Parent Hash ở tầng trên được tạo ra bằng phép băm ghép nối từ bao nhiêu nút con ở tầng dưới?",
    options: [
      "Một nút con duy nhất",
      "Chính xác hai nút con (nút trái và nút phải)",
      "Ba nút con",
      "Tùy ý không giới hạn"
    ],
    correctIndex: 1, // B
  },
  // 32. [Vừa]
  {
    id: 32,
    difficulty: "medium",
    question: "Điểm vượt trội của cây Merkle so với danh sách tuyến tính (Linked List / Array) trong việc xác minh giao dịch là gì?",
    options: [
      "Không cần sử dụng hàm băm",
      "Không cần liên kết các phần tử",
      "Cho phép kiểm tra cục bộ với độ phức tạp O(log n) thay vì phải duyệt toàn bộ danh sách O(n)",
      "Không có đỉnh Root"
    ],
    correctIndex: 2, // C
  },
  // 33. [Vừa]
  {
    id: 33,
    difficulty: "medium",
    question: "Nếu kết quả băm tái tạo từ Merkle Proof không khớp với Merkle Root trong Block Header, kết luận nào hợp lý nhất?",
    options: [
      "Số nguyên Nonce bị lỗi",
      "Dấu thời gian Timestamp bị sai lệch",
      "Ứng dụng ví bị xung đột phần mềm",
      "Giao dịch đó không thuộc khối hoặc dữ liệu giao dịch/bằng chứng đã bị chỉnh sửa, làm sai lệch tính toàn vẹn"
    ],
    correctIndex: 3, // D
  },
  // 34. [Vừa]
  {
    id: 34,
    difficulty: "medium",
    question: "Mục tiêu thiết kế hàng đầu của cây Merkle trong cấu trúc khối blockchain là gì?",
    options: [
      "Tối ưu hóa tốc độ và tài nguyên khi xác minh sự tồn tại của giao dịch trong khối",
      "Tạo chữ ký số an toàn",
      "Mã hóa bất đối xứng khóa RSA",
      "Đạt được sự đồng thuận giữa các validator"
    ],
    correctIndex: 0, // A
  },
  // 35. [Vừa]
  {
    id: 35,
    difficulty: "medium",
    question: "Trong mạng Bitcoin, các nút lá và nút nhánh của Merkle Tree đều được tính toán bằng thuật toán hàm băm nào?",
    options: [
      "MD5",
      "Double-SHA-256 (SHA-256 hai lần)",
      "DES",
      "RSA-2048"
    ],
    correctIndex: 1, // B
  },
  // 36. [Vừa]
  {
    id: 36,
    difficulty: "medium",
    question: "Khi số lượng giao dịch trong một khối tăng lên gấp đôi (từ N lên 2N), độ dài của Merkle Proof sẽ thay đổi như thế nào?",
    options: [
      "Tăng gấp đôi số lượng hash",
      "Tăng theo cấp số nhân O(N²)",
      "Chỉ tăng thêm đúng 1 hash (vì log₂(2N) = log₂(N) + 1)",
      "Hoàn toàn giữ nguyên không đổi"
    ],
    correctIndex: 2, // C
  },
  // 37. [Vừa]
  {
    id: 37,
    difficulty: "medium",
    question: "Nếu khối A và khối B có giá trị Merkle Root hoàn toàn trùng khớp (giả sử hàm băm an toàn không có va chạm), điều gì là chắc chắn đúng?",
    options: [
      "Khối A và khối B có Timestamp giống nhau",
      "Khối A và khối B có cùng Nonce",
      "Khối A và khối B được đào bởi cùng một thợ đào",
      "Cả hai khối có tập hợp giao dịch và thứ tự sắp xếp các giao dịch giống hệt nhau"
    ],
    correctIndex: 3, // D
  },
  // 38. [Vừa]
  {
    id: 38,
    difficulty: "medium",
    question: "Một nút ví nhẹ SPV trên điện thoại thông minh KHÔNG CẦN phải tải về thành phần nào sau đây?",
    options: [
      "Toàn bộ lịch sử hàng trăm Gigabyte dữ liệu giao dịch của toàn mạng",
      "Các tiêu đề Block Header",
      "Bằng chứng Merkle Proof của giao dịch cần kiểm tra",
      "Mã băm Merkle Root của khối tương ứng"
    ],
    correctIndex: 0, // A
  },
  // 39. [Vừa]
  {
    id: 39,
    difficulty: "medium",
    question: "Tính chất bảo mật cốt lõi mà cây Merkle bảo vệ mạnh mẽ nhất cho toàn bộ hệ thống là gì?",
    options: [
      "Tính ẩn danh của người dùng",
      "Tính toàn vẹn dữ liệu (Data Integrity) và tính bất biến chống giả mạo",
      "Tính mở rộng quy mô phần cứng",
      "Thuật toán giải bài toán đồng thuận"
    ],
    correctIndex: 1, // B
  },
  // 40. [Vừa]
  {
    id: 40,
    difficulty: "medium",
    question: "Quy trình tính toán giá trị Merkle Root của khối được thực hiện theo chiều nào?",
    options: [
      "Từ đỉnh gốc lan tỏa xuống các nút lá",
      "Tính toán ngẫu nhiên không theo thứ tự",
      "Tính từ các nút lá (Leaf) phía dưới rồi gom dần theo từng tầng lên đỉnh gốc (Bottom-Up)",
      "Tính theo chiều thời gian Timestamp"
    ],
    correctIndex: 2, // C
  },

  // --- PHẦN III – MỨC ĐỘ KHÓ (10 câu) ---
  // 41. [Khó]
  {
    id: 41,
    difficulty: "hard",
    question: "Nếu một khối chứa 16 giao dịch, cây Merkle nhị phân hoàn chỉnh sẽ có bao nhiêu tầng (mức) từ nút lá lên đến đỉnh Root?",
    options: [
      "3 tầng",
      "4 tầng",
      "8 tầng",
      "5 tầng (Tầng lá: 16 nút → 8 nút → 4 nút → 2 nút → 1 Merkle Root)"
    ],
    correctIndex: 3, // D
  },
  // 42. [Khó]
  {
    id: 42,
    difficulty: "hard",
    question: "Để chứng minh một giao dịch nằm trong một khối có 8 giao dịch, bản Merkle Proof cần cung cấp bao nhiêu mã hash anh em?",
    options: [
      "3 mã hash (vì log₂(8) = 3)",
      "1 mã hash",
      "7 mã hash",
      "8 mã hash"
    ],
    correctIndex: 0, // A
  },
  // 43. [Khó]
  {
    id: 43,
    difficulty: "hard",
    question: "Độ phức tạp tính toán và không gian truyền tải để xác minh một Merkle Proof cho khối có N giao dịch là bao nhiêu?",
    options: [
      "O(1)",
      "O(log N)",
      "O(N)",
      "O(N²)"
    ],
    correctIndex: 1, // B
  },
  // 44. [Khó]
  {
    id: 44,
    difficulty: "hard",
    question: "Nếu hàm băm SHA-256 bị tìm ra va chạm mạnh (Collision) trong thực tế, nguy cơ lớn nhất đối với cây Merkle là gì?",
    options: [
      "Kích thước của Merkle Root sẽ dài gấp đôi",
      "Tốc độ đào khối sẽ bị chậm lại",
      "Kẻ tấn công có thể thay thế một giao dịch giả mạo mà vẫn giữ nguyên giá trị Merkle Root, phá vỡ tính toàn vẹn",
      "Trường Nonce sẽ bị mất tác dụng"
    ],
    correctIndex: 2, // C
  },
  // 45. [Khó]
  {
    id: 45,
    difficulty: "hard",
    question: "Tại sao gửi một bản Merkle Proof lại có kích thước nhỏ hơn hàng nghìn lần so với việc gửi toàn bộ nội dung block?",
    options: [
      "Vì Merkle Proof sử dụng thuật toán nén ZIP",
      "Vì Merkle Proof không chứa chữ ký số",
      "Vì Merkle Proof tự động xóa dữ liệu giao dịch",
      "Vì Merkle Proof chỉ gửi đúng một đường dẫn các mã hash anh em (khoảng log₂(N) × 32 byte), không gửi toàn bộ N giao dịch"
    ],
    correctIndex: 3, // D
  },
  // 46. [Khó]
  {
    id: 46,
    difficulty: "hard",
    question: "Hai khối blockchain A và B chứa cùng tập hợp các giao dịch, nhưng có hai giao dịch bị đổi vị trí cho nhau. Kết quả là gì?",
    options: [
      "Hai khối sẽ có giá trị Merkle Root hoàn toàn KHÁC NHAU",
      "Hai khối chắc chắn vẫn có Merkle Root giống nhau",
      "Tiêu đề Block Header sẽ hoàn toàn giống nhau",
      "Mã Nonce của hai khối chắc chắn sẽ bằng nhau"
    ],
    correctIndex: 0, // A
  },
  // 47. [Khó]
  {
    id: 47,
    difficulty: "hard",
    question: "Hệ thống quản lý phiên bản mã nguồn Git sử dụng cấu trúc tương tự Merkle Tree (Merkle DAG) nhằm mục đích gì?",
    options: [
      "Khai thác coin trên máy chủ GitHub",
      "Kiểm tra và đảm bảo tính toàn vẹn, phát hiện lịch sử thay đổi của từng file và commit",
      "Tạo cặp khóa bí mật SSH",
      "Đồng bộ hóa giờ hệ thống trên máy trạm"
    ],
    correctIndex: 1, // B
  },
  // 48. [Khó]
  {
    id: 48,
    difficulty: "hard",
    question: "Tại sao cấu trúc cây Merkle lại đặc biệt phù hợp và tối ưu cho các mạng phân tán quy mô lớn (Distributed Networks)?",
    options: [
      "Vì nó làm giảm số lượng node trong mạng",
      "Vì nó làm tăng kích thước của mỗi block",
      "Vì các nút có thể độc lập xác minh từng phần dữ liệu một cách tin cậy mà không bắt buộc phải lưu trữ toàn bộ dữ liệu khổng lồ",
      "Vì nó có thể thay thế hoàn toàn thuật toán đồng thuận Proof of Work"
    ],
    correctIndex: 2, // C
  },
  // 49. [Khó]
  {
    id: 49,
    difficulty: "hard",
    question: "Nếu một nút nhận được giá trị Merkle Root chuẩn trong Block Header, nhưng khi tính toán chuỗi hash từ Merkle Proof lại ra một giá trị khác, điều đó chứng minh điều gì?",
    options: [
      "Giao dịch chắc chắn là hợp lệ",
      "Toàn bộ chuỗi blockchain đã bị xóa",
      "Khối đó không có thợ đào",
      "Giao dịch đó chưa được chứng minh là thuộc về khối (bằng chứng không hợp lệ hoặc giao dịch bị giả mạo)"
    ],
    correctIndex: 3, // D
  },
  // 50. [Khó]
  {
    id: 50,
    difficulty: "hard",
    question: "Đóng góp quan trọng nhất của cấu trúc Cây Merkle đối với thiết kế của Satoshi Nakamoto trong mạng Bitcoin là gì?",
    options: [
      "Cho phép thực thi cơ chế xác minh thanh toán tinh giản (SPV), giúp người dùng ví nhẹ trên di động không cần tải toàn bộ sổ cái",
      "Mã hóa các giao dịch để giấu kín số dư",
      "Loại bỏ sự cần thiết của các thợ đào",
      "Tự động giải phóng bộ nhớ của các Full Node sau mỗi 24 giờ"
    ],
    correctIndex: 0, // A
  }
];
