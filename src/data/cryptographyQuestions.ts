import type { QuizQuestionItem } from "./hashSha256Questions";

/**
 * Bộ 50 câu hỏi trắc nghiệm chủ đề "Mật mã học (Cryptography)"
 * Cấu trúc phân loại mức độ:
 * - Dễ (Easy): 20 câu (Câu 1 - 20)
 * - Vừa (Medium): 20 câu (Câu 21 - 40)
 * - Khó (Hard): 10 câu (Câu 41 - 50)
 * 
 * Phân bố đáp án đúng đồng đều và ngẫu nhiên, không theo khuôn mẫu:
 * A (index 0): 13 câu
 * B (index 1): 13 câu
 * C (index 2): 12 câu
 * D (index 3): 12 câu
 * Tổng cộng: 50 câu
 */
export const CRYPTOGRAPHY_50_QUESTIONS: QuizQuestionItem[] = [
  // ==========================================
  // PHẦN I – MỨC ĐỘ DỄ (20 CÂU)
  // ==========================================

  // 1. [Dễ]
  {
    id: 1,
    difficulty: "easy",
    question: "Mật mã học (Cryptography) là ngành khoa học nghiên cứu về lĩnh vực gì?",
    options: [
      "Kỹ thuật nén dữ liệu video không giảm chất lượng",
      "Giao thức truyền tải tệp tin qua mạng nội bộ LAN",
      "Khoa học bảo vệ thông tin, bảo mật, xác thực và đảm bảo tính toàn vẹn dữ liệu bằng thuật toán toán học",
      "Hệ quản trị cơ sở dữ liệu quan hệ phân tán"
    ],
    correctIndex: 2, // C
  },

  // 2. [Dễ]
  {
    id: 2,
    difficulty: "easy",
    question: "Hàm băm mật mã (Cryptographic Hash Function) sở hữu đặc điểm kỹ thuật nổi bật nào?",
    options: [
      "Luôn luôn tạo ra giá trị đầu ra có độ dài cố định dù đầu vào dài hay ngắn",
      "Có thể giải mã ngược lại dữ liệu gốc một cách dễ dàng",
      "Chỉ áp dụng được riêng cho các tệp tin hình ảnh",
      "Chỉ có thể chạy được trên mạng chuỗi khối Bitcoin"
    ],
    correctIndex: 0, // A
  },

  // 3. [Dễ]
  {
    id: 3,
    difficulty: "easy",
    question: "Thuật toán SHA-256 thuộc về nhóm công cụ mật mã nào sau đây?",
    options: [
      "Thuật toán mã hóa đối xứng khối",
      "Hệ mật mã chữ ký số bất đối xứng",
      "Giao thức đồng thuận mạng máy tính",
      "Hàm băm mật mã một chiều (Cryptographic Hash Function)"
    ],
    correctIndex: 3, // D
  },

  // 4. [Dễ]
  {
    id: 4,
    difficulty: "easy",
    question: "Thuật toán băm MD5 hiện nay được cộng đồng chuyên gia an ninh mạng đánh giá như thế nào?",
    options: [
      "Là tiêu chuẩn an toàn cao cấp nhất cho mật khẩu",
      "Không còn đủ an toàn vì đã bị phát hiện nhiều va chạm (collision) thực tế",
      "Thuật toán mã hóa bất đối xứng mạnh nhất",
      "Cơ chế cốt lõi của bài toán Proof of Work"
    ],
    correctIndex: 1, // B
  },

  // 5. [Dễ]
  {
    id: 5,
    difficulty: "easy",
    question: "Giá trị đầu ra duy nhất do hàm băm tạo ra còn thường được gọi bằng thuật ngữ nào?",
    options: [
      "Khóa công khai Public Key",
      "Số nguyên Nonce",
      "Nút gốc Merkle Root",
      "Hash Value (hoặc dấu vân tay số / Message Digest)"
    ],
    correctIndex: 3, // D
  },

  // 6. [Dễ]
  {
    id: 6,
    difficulty: "easy",
    question: "Hàm băm mật mã học về bản chất là loại hàm toán học nào?",
    options: [
      "Hàm một chiều (One-way function): dễ tính xuôi nhưng bất khả thi về mặt tính toán để tìm ngược lại đầu vào",
      "Hàm hai chiều có thể giải mã",
      "Hàm tuyến tính bậc nhất",
      "Hàm tuần hoàn có chu kỳ cố định"
    ],
    correctIndex: 0, // A
  },

  // 7. [Dễ]
  {
    id: 7,
    difficulty: "easy",
    question: "Chữ viết tắt 'SHA' trong tên gọi của thuật toán SHA-256 mang ý nghĩa là gì?",
    options: [
      "Safe Hybrid Access",
      "Secure Hardware Algorithm",
      "Secure Hash Algorithm (Thuật toán băm an toàn do NIST ban hành)",
      "System Hash Access"
    ],
    correctIndex: 2, // C
  },

  // 8. [Dễ]
  {
    id: 8,
    difficulty: "easy",
    question: "Ứng dụng phổ biến và cốt lõi nhất của hàm băm trong truyền nhận dữ liệu qua mạng là gì?",
    options: [
      "Tăng xung nhịp xử lý của CPU máy tính",
      "Kiểm tra và đảm bảo tính toàn vẹn dữ liệu (Data Integrity)",
      "Nén kích thước ổ cứng",
      "Tự động đào coin trên trình duyệt web"
    ],
    correctIndex: 1, // B
  },

  // 9. [Dễ]
  {
    id: 9,
    difficulty: "easy",
    question: "Nếu đưa hai tệp tin có nội dung hoàn toàn giống hệt nhau vào cùng một thuật toán băm xác định, kết quả hash sẽ như thế nào?",
    options: [
      "Luôn luôn cho ra giá trị băm hoàn toàn giống nhau trên mọi máy tính (tính tất định)",
      "Luôn luôn cho ra hai giá trị băm khác biệt nhau",
      "Cho ra kết quả ngẫu nhiên tùy thời điểm băm",
      "Kết quả phụ thuộc vào dung lượng RAM của máy tính"
    ],
    correctIndex: 0, // A
  },

  // 10. [Dễ]
  {
    id: 10,
    difficulty: "easy",
    question: "Nếu chỉ thay đổi dù chỉ đúng 1 ký tự hoặc 1 bit trong dữ liệu đầu vào, giá trị băm đầu ra sẽ ra sao?",
    options: [
      "Giá trị băm hoàn toàn giữ nguyên không đổi",
      "Chỉ thay đổi đúng 1 bit ở cuối chuỗi hash",
      "Chuỗi hash sẽ bị rút ngắn độ dài",
      "Giá trị băm thay đổi mạnh mẽ, hoàn toàn khác biệt và khó đoán trước (Hiệu ứng tuyết lở - Avalanche Effect)"
    ],
    correctIndex: 3, // D
  },

  // 11. [Dễ]
  {
    id: 11,
    difficulty: "easy",
    question: "Thuật toán mã hóa AES (Advanced Encryption Standard) thuộc về loại hình mật mã nào?",
    options: [
      "Mã hóa bất đối xứng",
      "Mã hóa đối xứng (Symmetric Encryption - dùng chung một khóa bí mật để mã hóa và giải mã)",
      "Hàm băm một chiều không có khóa",
      "Cấu trúc cây Merkle"
    ],
    correctIndex: 1, // B
  },

  // 12. [Dễ]
  {
    id: 12,
    difficulty: "easy",
    question: "Thuật toán RSA thuộc về loại hình mật mã học nào sau đây?",
    options: [
      "Mã hóa đối xứng cổ điển",
      "Hàm băm không giải mã",
      "Mã hóa bất đối xứng (Asymmetric Encryption - sử dụng cặp khóa công khai và bí mật)",
      "Thuật toán nén tập tin"
    ],
    correctIndex: 2, // C
  },

  // 13. [Dễ]
  {
    id: 13,
    difficulty: "easy",
    question: "Chữ ký số (Digital Signature) được sử dụng nhằm mục đích chính yếu nào?",
    options: [
      "Làm ẩn giấu và bảo mật tuyệt đối dung lượng của tệp tin",
      "Xác thực danh tính người gửi (Authentication) và bảo đảm tính toàn vẹn của thông điệp (Integrity)",
      "Tăng tốc độ băng thông của kết nối mạng Internet",
      "Gia tăng tuổi thọ của ổ cứng lưu trữ"
    ],
    correctIndex: 1, // B
  },

  // 14. [Dễ]
  {
    id: 14,
    difficulty: "easy",
    question: "Khóa công khai (Public Key) trong hệ mật mã bất đối xứng có đặc điểm gì?",
    options: [
      "Có thể công khai và chia sẻ rộng rãi cho bất kỳ ai trong mạng",
      "Bắt buộc phải giữ tuyệt đối bí mật không cho ai biết",
      "Chỉ các node thợ đào mới được quyền nắm giữ",
      "Chỉ máy chủ của ngân hàng trung ương mới có quyền đọc"
    ],
    correctIndex: 0, // A
  },

  // 15. [Dễ]
  {
    id: 15,
    difficulty: "easy",
    question: "Khóa bí mật (Private Key) trong ví tiền mã hóa bắt buộc phải được xử lý như thế nào?",
    options: [
      "Phát sóng công khai lên các mạng xã hội",
      "Nhúng trực tiếp vào tiêu đề khối để thợ đào đọc",
      "Phải được chủ sở hữu giữ tuyệt đối bí mật vì lộ khóa riêng đồng nghĩa với mất toàn bộ quyền kiểm soát tài sản",
      "Gửi qua email dạng bản rõ cho bạn bè lưu hộ"
    ],
    correctIndex: 2, // C
  },

  // 16. [Dễ]
  {
    id: 16,
    difficulty: "easy",
    question: "Có thể sử dụng hàm băm (như SHA-256) làm công cụ để mã hóa dữ liệu bí mật có thể giải mã được không?",
    options: [
      "Có, bất kỳ ai cũng giải mã được hash",
      "Chỉ giải mã được trong mạng Bitcoin",
      "Chỉ giải mã được khi kết hợp với RSA",
      "KHÔNG, hàm băm là phép biến đổi một chiều không thể khôi phục trực tiếp lại nội dung ban đầu"
    ],
    correctIndex: 3, // D
  },

  // 17. [Dễ]
  {
    id: 17,
    difficulty: "easy",
    question: "Hệ thống Blockchain của Bitcoin sử dụng thuật toán hàm băm cốt lõi nào cho địa chỉ và Proof of Work?",
    options: [
      "MD5",
      "SHA-256 (Secure Hash Algorithm 256-bit)",
      "SHA-1",
      "DES"
    ],
    correctIndex: 1, // B
  },

  // 18. [Dễ]
  {
    id: 18,
    difficulty: "easy",
    question: "Đặc điểm cơ bản về độ dài kích thước đầu ra của hàm băm là gì?",
    options: [
      "Luôn luôn có kích thước cố định được quy định trước bởi thuật toán (ví dụ 256 bit cho SHA-256)",
      "Thay đổi ngẫu nhiên theo dung lượng tập tin đầu vào",
      "Luôn luôn bằng chính xác dung lượng của file gốc",
      "Cố định ở mức 64 Kilobyte"
    ],
    correctIndex: 0, // A
  },

  // 19. [Dễ]
  {
    id: 19,
    difficulty: "easy",
    question: "Độ dài chuỗi nhị phân đầu ra của thuật toán SHA-256 là bao nhiêu bit?",
    options: [
      "128 bit",
      "160 bit",
      "512 bit",
      "256 bit (tương đương 32 byte hoặc 64 ký tự thập lục phân hex)"
    ],
    correctIndex: 3, // D
  },

  // 20. [Dễ]
  {
    id: 20,
    difficulty: "easy",
    question: "Mục tiêu trọng tâm nhất của việc ứng dụng hàm băm trong kiến trúc khối Blockchain là gì?",
    options: [
      "Mã hóa bí mật số dư của mọi tài khoản",
      "Tăng tốc độ đào coin của card đồ họa",
      "Đảm bảo tính toàn vẹn (Integrity) và phát hiện tức thì mọi hành vi can thiệp sửa đổi dữ liệu khối",
      "Tạo ra các khóa đối xứng tự động"
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
    question: "Tính chất kháng tiền ảnh (Preimage Resistance / One-wayness) của hàm băm có nghĩa là gì?",
    options: [
      "Khó khăn trong việc tìm ra số Nonce của thợ đào",
      "Khi cho trước một giá trị hash h, gần như bất khả thi về mặt tính toán để tìm ra thông điệp m sao cho H(m) = h",
      "Không thể tạo được cặp khóa công khai",
      "Không thể đóng gói giao dịch vào khối mới"
    ],
    correctIndex: 1, // B
  },

  // 22. [Vừa]
  {
    id: 22,
    difficulty: "medium",
    question: "Tính chất kháng đụng độ yếu (Weak Collision Resistance / Second Preimage Resistance) đòi hỏi điều kiện nào?",
    options: [
      "Không thể tạo được cây Merkle cho khối",
      "Không thể giải mã được bản tin RSA",
      "Không thể phát sóng giao dịch lên mạng P2P",
      "Với một thông điệp M₁ đã biết trước, rất khó tìm được thông điệp M₂ ≠ M₁ sao cho H(M₂) = H(M₁)"
    ],
    correctIndex: 3, // D
  },

  // 23. [Vừa]
  {
    id: 23,
    difficulty: "medium",
    question: "Tính chất kháng đụng độ mạnh (Strong Collision Resistance) được định nghĩa là gì?",
    options: [
      "Rất khó để tìm ra bất kỳ cặp thông điệp nào (M₁ ≠ M₂) sao cho H(M₁) = H(M₂)",
      "Khó khăn trong việc giải mã thuật toán AES",
      "Khó khăn trong việc kết nối các node ngang hàng",
      "Hàm băm bắt buộc phải có độ dài khóa trên 4096 bit"
    ],
    correctIndex: 0, // A
  },

  // 24. [Vừa]
  {
    id: 24,
    difficulty: "medium",
    question: "Vì sao các hệ thống Blockchain hiện đại tuyệt đối không sử dụng hàm băm MD5?",
    options: [
      "Vì chuỗi hash MD5 có độ dài quá lớn",
      "Vì thuật toán MD5 chạy quá chậm",
      "Vì MD5 đã bị bẻ gãy tính kháng va chạm trong thực tế (va chạm có thể tìm thấy trong vài giây)",
      "Vì thuật toán MD5 đòi hỏi phải trả phí bản quyền"
    ],
    correctIndex: 2, // C
  },

  // 25. [Vừa]
  {
    id: 25,
    difficulty: "medium",
    question: "Hiệu ứng tuyết lở (Avalanche Effect) trong mật mã học được mô tả như thế nào?",
    options: [
      "Hàm băm sẽ tự động rút ngắn chuỗi kết quả khi quá tải",
      "Gia tăng tốc độ tính toán cho các phép toán RSA",
      "Loại bỏ hoàn toàn khả năng xảy ra va chạm toán học",
      "Một sự thay đổi nhỏ ở đầu vào (dù chỉ 1 bit) sẽ dẫn đến sự thay đổi sâu sắc và ngẫu nhiên ở phần lớn các bit đầu ra"
    ],
    correctIndex: 3, // D
  },

  // 26. [Vừa]
  {
    id: 26,
    difficulty: "medium",
    question: "Khi lưu trữ mật khẩu người dùng dưới dạng hash, kỹ thuật nào bắt buộc phải kết hợp để chống lại tấn công Rainbow Table?",
    options: [
      "Salt (chuỗi muối ngẫu nhiên bổ sung vào trước khi băm)",
      "Dấu thời gian Timestamp",
      "Số nguyên Nonce đào coin",
      "Gốc Merkle Root"
    ],
    correctIndex: 0, // A
  },

  // 27. [Vừa]
  {
    id: 27,
    difficulty: "medium",
    question: "Bảng cầu vồng (Rainbow Table) trong an ninh mật mã là gì và được kẻ tấn công sử dụng nhằm mục đích gì?",
    options: [
      "Một bảng mã màu giúp tăng tốc card đồ họa",
      "Một bảng tính toán trước các giá trị băm của hàng triệu mật khẩu phổ biến để tra cứu đảo ngược nhanh chóng",
      "Bảng phân bổ các địa chỉ ví thợ đào",
      "Danh sách các giao dịch trong khối chờ xác nhận"
    ],
    correctIndex: 1, // B
  },

  // 28. [Vừa]
  {
    id: 28,
    difficulty: "medium",
    question: "Trong các giao thức chữ ký số thực tế, người ta thực hiện phép ký lên thành phần nào?",
    options: [
      "Toàn bộ từng byte của tệp tin dung lượng lớn",
      "Khóa công khai của người nhận",
      "Bản băm (Hash) của thông điệp để tối ưu hóa tốc độ và giữ kích thước chữ ký nhỏ gọn cố định",
      "Địa chỉ IP của máy chủ gửi tin"
    ],
    correctIndex: 2, // C
  },

  // 29. [Vừa]
  {
    id: 29,
    difficulty: "medium",
    question: "Ưu điểm vượt trội nhất của các thuật toán mã hóa đối xứng (như AES, ChaCha20) là gì?",
    options: [
      "Không cần sử dụng bất kỳ loại khóa nào",
      "Tốc độ xử lý cực nhanh và tiêu thụ ít tài nguyên CPU, rất phù hợp để mã hóa khối lượng dữ liệu khổng lồ",
      "Không bao giờ cần đến quá trình giải mã",
      "Không cần cài đặt thuật toán trên máy tính"
    ],
    correctIndex: 1, // B
  },

  // 30. [Vừa]
  {
    id: 30,
    difficulty: "medium",
    question: "Hệ mật mã bất đối xứng (như RSA, ECC) trong thực tế phù hợp nhất cho các tác vụ nào?",
    options: [
      "Mã hóa trực tiếp các tập tin video 4K dung lượng hàng Gigabyte",
      "Tăng dung lượng lưu trữ của thẻ nhớ",
      "Khai thác các khối Bitcoin",
      "Thiết lập kênh trao đổi khóa phiên an toàn (Key Exchange) và tạo chữ ký số (Digital Signatures)"
    ],
    correctIndex: 3, // D
  },

  // 31. [Vừa]
  {
    id: 31,
    difficulty: "medium",
    question: "Vì sao các mạng Blockchain công khai (như Bitcoin, Ethereum) KHÔNG mã hóa bí mật toàn bộ nội dung giao dịch trên chuỗi?",
    options: [
      "Vì toàn bộ các node độc lập trong mạng cần phải đọc được dữ liệu để xác minh tính hợp lệ của số dư và chữ ký",
      "Vì mạng blockchain không có thuật toán mã hóa",
      "Vì người dùng không có khóa bảo mật",
      "Vì mạng ngang hàng không hỗ trợ mã hóa dữ liệu"
    ],
    correctIndex: 0, // A
  },

  // 32. [Vừa]
  {
    id: 32,
    difficulty: "medium",
    question: "Tại sao việc so sánh giá trị hash trước và sau khi truyền tải có thể chứng minh dữ liệu không bị thay đổi?",
    options: [
      "Vì dấu thời gian Timestamp hoàn toàn giống nhau",
      "Vì số Nonce của hai máy tính trùng nhau",
      "Vì tính tất định và hiệu ứng tuyết lở: nếu dữ liệu bị sửa đổi dù 1 bit thì mã hash mới chắc chắn sẽ khác mã hash cũ",
      "Vì ứng dụng ví tự động kiểm tra"
    ],
    correctIndex: 2, // C
  },

  // 33. [Vừa]
  {
    id: 33,
    difficulty: "medium",
    question: "Thuật toán SHA-1 hiện nay đã bị loại bỏ khỏi các tiêu chuẩn mật mã vì lý do nào sau đây?",
    options: [
      "Thuật toán chạy quá nhanh làm quá tải CPU",
      "Thuật toán đòi hỏi phải đóng phí giấy phép sử dụng",
      "Thuật toán không thể xuất ra chuỗi nhị phân",
      "Các nhà nghiên cứu (Google) đã công bố cuộc tấn công va chạm thực tế (SHAttered attack) tạo ra hai file PDF khác nhau cùng hash"
    ],
    correctIndex: 3, // D
  },

  // 34. [Vừa]
  {
    id: 34,
    difficulty: "medium",
    question: "Mã xác thực thông điệp dựa trên hàm băm (HMAC) khác biệt cơ bản với hàm băm thông thường ở điểm nào?",
    options: [
      "HMAC không sử dụng hàm băm SHA",
      "HMAC kết hợp thêm một khóa bí mật (Secret Key) cùng thông điệp để xác thực cả tính toàn vẹn lẫn nguồn gốc người gửi",
      "HMAC luôn luôn cho ra chuỗi hash dài hơn 1024 bit",
      "HMAC không tiếp nhận bất kỳ dữ liệu đầu vào nào"
    ],
    correctIndex: 1, // B
  },

  // 35. [Vừa]
  {
    id: 35,
    difficulty: "medium",
    question: "Chữ ký số (Digital Signature) thuần túy HOÀN TOÀN KHÔNG đảm bảo thuộc tính an ninh nào sau đây?",
    options: [
      "Tính bí mật của nội dung thông điệp (Confidentiality — muốn bí mật nội dung thì bắt buộc phải kết hợp mã hóa)",
      "Tính xác thực danh tính người gửi (Authentication)",
      "Tính toàn vẹn của dữ liệu thông điệp (Data Integrity)",
      "Tính chống chối bỏ hành vi ký kết (Non-repudiation)"
    ],
    correctIndex: 0, // A
  },

  // 36. [Vừa]
  {
    id: 36,
    difficulty: "medium",
    question: "Trong cấu trúc của Blockchain, việc nhúng mã băm của khối trước vào khối sau nhằm mục đích gì?",
    options: [
      "Tăng xung nhịp xử lý của máy tính thợ đào",
      "Giảm dung lượng bộ nhớ RAM của mạng",
      "Tạo mối liên kết mật mã chặt chẽ giữa các block, biến chuỗi khối thành sổ cái bất biến chống sửa đổi lịch sử",
      "Tăng số lượng khung hình hiển thị"
    ],
    correctIndex: 2, // C
  },

  // 37. [Vừa]
  {
    id: 37,
    difficulty: "medium",
    question: "Nếu cùng một chuỗi văn bản được đưa vào tính toán bằng hàm SHA-256 trên hai hệ điều hành khác nhau (Windows và Linux), kết quả sẽ ra sao?",
    options: [
      "Hai kết quả hash hoàn toàn giống hệt nhau từng ký tự vì hàm băm có tính chất tất định tuyệt đối",
      "Hai kết quả hash sẽ khác nhau tùy thuộc vào vi xử lý CPU",
      "Hai kết quả hash sẽ khác nhau tùy thuộc vào hệ điều hành",
      "Một trong hai máy tính sẽ bị báo lỗi thuật toán"
    ],
    correctIndex: 0, // A
  },

  // 38. [Vừa]
  {
    id: 38,
    difficulty: "medium",
    question: "Hiện tượng Collision (Đụng độ / Va chạm) trong lý thuyết hàm băm được hiểu chính xác là gì?",
    options: [
      "Hai khóa bí mật có độ dài bằng nhau",
      "Hai khối blockchain có cùng chỉ số độ cao",
      "Hai thợ đào cùng sở hữu một địa chỉ ví",
      "Tồn tại hai dữ liệu đầu vào khác biệt nhau (x ≠ y) nhưng lại cho ra cùng một giá trị băm giống hệt nhau Hash(x) = Hash(y)"
    ],
    correctIndex: 3, // D
  },

  // 39. [Vừa]
  {
    id: 39,
    difficulty: "medium",
    question: "Một thuật toán hàm băm mật mã tốt và an toàn bắt buộc phải có tính chất nào đối với không gian đầu ra?",
    options: [
      "Đầu ra phải dễ dàng đảo ngược được",
      "Phân bố đầu ra đồng đều và ngẫu nhiên giả (Pseudorandom distribution) để giảm thiểu tối đa xác suất va chạm",
      "Độ dài đầu ra thay đổi theo dung lượng bộ nhớ RAM",
      "Không cần thiết phải có tính chất một chiều"
    ],
    correctIndex: 1, // B
  },

  // 40. [Vừa]
  {
    id: 40,
    difficulty: "medium",
    question: "Trong cấu trúc của mạng Blockchain, hàm băm được ứng dụng rộng rãi ở những thành phần cốt lõi nào?",
    options: [
      "Chỉ dùng riêng trong việc đặt tên ví",
      "Chỉ dùng riêng trong trường Timestamp",
      "Cả việc xây dựng cây Merkle, liên kết Previous Hash giữa các block, tạo địa chỉ ví và bài toán Proof of Work",
      "Chỉ dùng riêng trong giao thức mã hóa RSA"
    ],
    correctIndex: 2, // C
  },

  // ==========================================
  // PHẦN III – MỨC ĐỘ KHÓ (10 CÂU)
  // ==========================================

  // 41. [Khó]
  {
    id: 41,
    difficulty: "hard",
    question: "Tại sao cuộc tấn công nghịch lý ngày sinh (Birthday Attack) lại cần ít phép thử hơn nhiều so với tấn công tiền ảnh (Preimage Attack)?",
    options: [
      "Vì thuật toán SHA-256 có lỗ hổng toán học",
      "Vì các khối blockchain luôn chứa dấu thời gian",
      "Vì tấn công va chạm chỉ cần tìm bất kỳ hai thông điệp nào trùng hash với nhau, thay vì phải khớp với một hash đã cố định trước",
      "Vì kẻ tấn công có sẵn giá trị Nonce của thợ đào"
    ],
    correctIndex: 2, // C
  },

  // 42. [Khó]
  {
    id: 42,
    difficulty: "hard",
    question: "Để tìm được tiền ảnh (Preimage) của một giá trị hash SHA-256 cụ thể bằng phương pháp duyệt vét cạn (Brute-force), số phép thử lý thuyết là bao nhiêu?",
    options: [
      "Khoảng 2²⁵⁶ phép thử (mức an toàn lý tưởng của không gian 256-bit)",
      "Khoảng 2⁶⁴ phép thử",
      "Khoảng 2¹²⁸ phép thử",
      "Khoảng 2³² phép thử"
    ],
    correctIndex: 0, // A
  },

  // 43. [Khó]
  {
    id: 43,
    difficulty: "hard",
    question: "Theo nguyên lý nghịch lý ngày sinh, độ phức tạp tính toán để tìm ra một va chạm (Collision) bất kỳ trên hàm băm SHA-256 là khoảng bao nhiêu?",
    options: [
      "Khoảng 2⁶⁴ phép thử",
      "Khoảng 2¹²⁸ phép thử (bằng 2^(256/2))",
      "Khoảng 2³² phép thử",
      "Khoảng 2²⁵⁶ phép thử"
    ],
    correctIndex: 1, // B
  },

  // 44. [Khó]
  {
    id: 44,
    difficulty: "hard",
    question: "Thuật toán máy tính lượng tử Grover ảnh hưởng chủ yếu đến lĩnh vực mật mã nào và làm suy giảm độ an toàn như thế nào?",
    options: [
      "Bẻ khóa trực tiếp thuật toán RSA trong 1 giây",
      "Làm sai lệch dấu thời gian Timestamp",
      "Phá hủy cấu trúc cây Merkle",
      "Tăng tốc tìm kiếm không gian khóa mã đối xứng và hàm băm, làm giảm độ an toàn hiệu dụng còn căn bậc hai (cần khóa 256 bit để giữ độ an toàn 128 bit)"
    ],
    correctIndex: 3, // D
  },

  // 45. [Khó]
  {
    id: 45,
    difficulty: "hard",
    question: "Thuật toán máy tính lượng tử Shor (Shor's Algorithm) đe dọa trực tiếp và có khả năng giải quyết trong thời gian đa thức bài toán nào?",
    options: [
      "Các hệ mật mã khóa công khai dựa trên phân tích số nguyên lớn (RSA) và logarit rời rạc trên đường cong Elliptic (ECC/ECDSA)",
      "Bài toán băm kép SHA-256",
      "Giao thức mã hóa đối xứng AES-256",
      "Cơ chế xác thực tin nhắn HMAC"
    ],
    correctIndex: 0, // A
  },

  // 46. [Khó]
  {
    id: 46,
    difficulty: "hard",
    question: "Nếu thuật toán SHA-256 bị phát hiện một phương pháp tìm va chạm mạnh (Collision) hiệu quả trong thực tế, hậu quả nghiêm trọng nhất đối với blockchain là gì?",
    options: [
      "Tốc độ giải bài toán đào coin bị chậm lại",
      "Kẻ tấn công có thể giả mạo giao dịch khác nhưng vẫn cho ra cùng Merkle Root, phá vỡ tính toàn vẹn và bất biến của sổ cái",
      "Kích thước của mỗi block sẽ tự động tăng lên gấp đôi",
      "Tất cả các ví cá nhân sẽ tự động bị mất khóa riêng"
    ],
    correctIndex: 1, // B
  },

  // 47. [Khó]
  {
    id: 47,
    difficulty: "hard",
    question: "Vì sao giao thức xác thực API sử dụng HMAC lại an toàn hơn nhiều so với việc chỉ băm đơn thuần `Hash(Secret + Data)`?",
    options: [
      "Vì cấu trúc hai vòng lặp lồng nhau của HMAC ngăn chặn hoàn toàn cuộc tấn công kéo dài độ dài (Length Extension Attack)",
      "Vì HMAC không sử dụng các hàm băm",
      "Vì HMAC tự động gửi khóa công khai cho máy chủ",
      "Vì HMAC có dung lượng chuỗi băm lớn hơn"
    ],
    correctIndex: 0, // A
  },

  // 48. [Khó]
  {
    id: 48,
    difficulty: "hard",
    question: "Nếu khóa bí mật (Private Key) của một địa chỉ ví blockchain bị rò rỉ ra bên ngoài, rủi ro lớn nhất và trực tiếp nhất là gì?",
    options: [
      "Giá trị hash của các khối trong quá khứ bị thay đổi",
      "Merkle Root của toàn mạng bị sụp đổ",
      "Dấu thời gian Timestamp của mạng bị sai lệch",
      "Kẻ tấn công có toàn quyền tạo chữ ký số hợp lệ thay mặt nạn nhân để rút sạch toàn bộ tài sản trên chuỗi"
    ],
    correctIndex: 3, // D
  },

  // 49. [Khó]
  {
    id: 49,
    difficulty: "hard",
    question: "Tổ hợp mật mã lai (Hybrid Cryptography) phổ biến và chuẩn mực nhất trong thực tế để bảo vệ các luồng dữ liệu lớn là gì?",
    options: [
      "Sử dụng hai hàm băm SHA-256 lồng vào nhau",
      "Sử dụng MD5 kết hợp với RSA",
      "Sử dụng mã hóa đối xứng AES để mã hóa dữ liệu tốc độ cao, kết hợp mã hóa bất đối xứng RSA/ECC để truyền khóa phiên AES an toàn",
      "Sử dụng thuật toán DES kết hợp với SHA"
    ],
    correctIndex: 2, // C
  },

  // 50. [Khó]
  {
    id: 50,
    difficulty: "hard",
    question: "Phát biểu nào sau đây phân biệt đúng đắn và chuẩn xác nhất mối quan hệ giữa Hàm băm (Hash) và Mã hóa bất đối xứng (RSA/ECC)?",
    options: [
      "Hàm băm dùng để nén dữ liệu, còn RSA dùng để giải nén",
      "Hàm băm đảm bảo tính toàn vẹn và dấu vân tay một chiều; RSA/ECC hỗ trợ mã hóa bảo mật thông điệp và xác thực quyền sở hữu qua chữ ký số",
      "Thuật toán RSA thay thế hoàn toàn vai trò của các hàm băm trong blockchain",
      "Hai thuật toán này hoàn toàn giống nhau về mặt toán học"
    ],
    correctIndex: 1, // B
  }
];
