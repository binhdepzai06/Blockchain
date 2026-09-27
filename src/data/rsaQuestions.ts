import type { QuizQuestionItem } from "./hashSha256Questions";

/**
 * Bộ 50 câu hỏi trắc nghiệm chủ đề "Mã hoá RSA & Chữ ký số"
 * Phân bố chuẩn theo tài liệu:
 * - Phần I – Mức độ Dễ: 20 câu
 * - Phần II – Mức độ Vừa: 18 câu
 * - Phần III – Mức độ Khó: 12 câu
 * 
 * Phân bố đáp án đúng:
 * A (index 0): 13 câu
 * B (index 1): 13 câu
 * C (index 2): 12 câu
 * D (index 3): 12 câu
 * Tổng: 50 câu
 */
export const RSA_50_QUESTIONS: QuizQuestionItem[] = [
  // --- PHẦN I: MỨC ĐỘ DỄ (20 câu) ---
  // 1. [Dễ]
  {
    id: 1,
    difficulty: "easy",
    question: "RSA là loại thuật toán mật mã nào?",
    options: [
      "Mã hóa đối xứng",
      "Mã hóa bất đối xứng (Asymmetric / Khóa công khai)",
      "Hàm băm một chiều không giải mã",
      "Thuật toán nén dữ liệu lossless"
    ],
    correctIndex: 1, // B
  },
  // 2. [Dễ]
  {
    id: 2,
    difficulty: "easy",
    question: "Tên gọi RSA được đặt theo chữ cái đầu của ba nhà khoa học máy tính nào?",
    options: [
      "Ron Rivest, Adi Shamir và Leonard Adleman",
      "Ron Rivest, Steve Jobs và Alan Turing",
      "Michael Rabin, Claude Shannon và Leonard Adams",
      "Ron Rivest, Satoshi Nakamoto và Leslie Lamport"
    ],
    correctIndex: 0, // A
  },
  // 3. [Dễ]
  {
    id: 3,
    difficulty: "easy",
    question: "Trong cặp khóa của hệ mã hóa RSA, khóa nào được phép công khai và chia sẻ rộng rãi cho mọi người?",
    options: [
      "Private key (Khóa bí mật)",
      "Session key (Khóa phiên)",
      "Nonce ngẫu nhiên",
      "Public key (Khóa công khai)"
    ],
    correctIndex: 3, // D
  },
  // 4. [Dễ]
  {
    id: 4,
    difficulty: "easy",
    question: "Khóa nào trong hệ thống RSA bắt buộc phải được chủ sở hữu giữ tuyệt đối bí mật?",
    options: [
      "Public key (Khóa công khai)",
      "Private key (Khóa bí mật)",
      "Mã băm Hash value",
      "Dấu thời gian Timestamp"
    ],
    correctIndex: 1, // B
  },
  // 5. [Dễ]
  {
    id: 5,
    difficulty: "easy",
    question: "Giá trị modulo n trong thuật toán sinh khóa RSA được tạo ra bằng phép tính nào từ hai số nguyên tố p và q?",
    options: [
      "n = p + q",
      "n = p² - q",
      "n = p × q",
      "n = (p - 1) × (q - 1)"
    ],
    correctIndex: 2, // C
  },
  // 6. [Dễ]
  {
    id: 6,
    difficulty: "easy",
    question: "Độ an toàn của thuật toán mã hóa RSA dựa trên độ khó của bài toán toán học nào?",
    options: [
      "Bài toán phân tích một số nguyên cực lớn thành tích các thừa số nguyên tố (Integer Factorization)",
      "Bài toán sắp xếp dãy số trong thời gian tuyến tính",
      "Bài toán tìm kiếm đường đi ngắn nhất trên đồ thị Euler",
      "Bài toán nhân hai ma trận kích thước lớn"
    ],
    correctIndex: 0, // A
  },
  // 7. [Dễ]
  {
    id: 7,
    difficulty: "easy",
    question: "Trong các hệ thống blockchain và tiền mã hóa, Private Key chủ yếu được sử dụng để làm gì?",
    options: [
      "Tạo ra cây Merkle của toàn bộ các giao dịch",
      "Giải mã toàn bộ dữ liệu lưu trong thân khối",
      "Tạo chữ ký số (Digital Signature) để xác thực và ký duyệt giao dịch chi tiêu",
      "Đồng bộ hóa dấu thời gian giữa các node mạng"
    ],
    correctIndex: 2, // C
  },
  // 8. [Dễ]
  {
    id: 8,
    difficulty: "easy",
    question: "Thuật toán nào sau đây là hàm băm một chiều (Hash function), chứ KHÔNG PHẢI thuật toán mã hóa?",
    options: [
      "DES",
      "AES",
      "RSA",
      "SHA-256"
    ],
    correctIndex: 3, // D
  },
  // 9. [Dễ]
  {
    id: 9,
    difficulty: "easy",
    question: "Chữ ký số (Digital Signature) đảm bảo hai tính chất an ninh quan trọng nhất nào?",
    options: [
      "Bảo mật tuyệt đối nội dung và tăng tốc độ mạng",
      "Xác thực danh tính người gửi (Authentication) và tính toàn vẹn dữ liệu (Integrity)",
      "Nén kích thước dữ liệu và chống virus máy tính",
      "Tự động chuyển tiếp thông điệp qua mạng ngang hàng"
    ],
    correctIndex: 1, // B
  },
  // 10. [Dễ]
  {
    id: 10,
    difficulty: "easy",
    question: "Ai có khả năng kiểm tra và xác minh tính hợp lệ của một chữ ký số RSA?",
    options: [
      "Bất kỳ ai có được Public Key của người ký",
      "Chỉ duy nhất người đã tạo ra chữ ký đó",
      "Chỉ các node thợ đào (miner) mới có quyền kiểm tra",
      "Chỉ cơ quan cấp dấu thời gian (TSA)"
    ],
    correctIndex: 0, // A
  },
  // 11. [Dễ]
  {
    id: 11,
    difficulty: "easy",
    question: "Mật mã RSA thuộc nhóm mật mã nào sau đây?",
    options: [
      "Mật mã đối xứng (Symmetric cryptography)",
      "Mật mã hàm băm (Hash algorithm)",
      "Mật mã bất đối xứng (Asymmetric cryptography)",
      "Cơ chế đồng thuận mạng phân tán"
    ],
    correctIndex: 2, // C
  },
  // 12. [Dễ]
  {
    id: 12,
    difficulty: "easy",
    question: "Nếu một thông điệp đã ký bị kẻ gian thay đổi dù chỉ 1 bit, điều gì sẽ xảy ra khi xác minh chữ ký?",
    options: [
      "Chữ ký vẫn được xác minh là hợp lệ",
      "Khóa riêng của người gửi sẽ bị thay đổi theo",
      "Hệ thống sẽ tự động sửa lại bit bị sai",
      "Chữ ký số sẽ không còn hợp lệ (quá trình xác minh thất bại ngay lập tức)"
    ],
    correctIndex: 3, // D
  },
  // 13. [Dễ]
  {
    id: 13,
    difficulty: "easy",
    question: "Người dùng có cần phải giữ bí mật Public Key của mình không?",
    options: [
      "HOÀN TOÀN KHÔNG, Public Key được tạo ra để công khai cho mọi người cùng sử dụng",
      "CÓ, phải giữ bí mật giống hệt như Private Key",
      "Chỉ được phép chia sẻ cho các ngân hàng trung ương",
      "Chỉ được phép gửi cho các node thợ đào"
    ],
    correctIndex: 0, // A
  },
  // 14. [Dễ]
  {
    id: 14,
    difficulty: "easy",
    question: "Khi Alice muốn gửi một bức thư mật cho Bob bằng hệ mã hóa RSA, Alice sẽ dùng khóa nào để mã hóa?",
    options: [
      "Private Key của Alice",
      "Public Key của Bob",
      "Public Key của Alice",
      "Private Key của Bob"
    ],
    correctIndex: 1, // B
  },
  // 15. [Dễ]
  {
    id: 15,
    difficulty: "easy",
    question: "Sau khi nhận được bức thư mật từ Alice đã mã hóa bằng RSA, Bob sẽ dùng khóa nào để giải mã?",
    options: [
      "Public Key của Alice",
      "Public Key của Bob",
      "Private Key của Bob",
      "Private Key của Alice"
    ],
    correctIndex: 2, // C
  },
  // 16. [Dễ]
  {
    id: 16,
    difficulty: "easy",
    question: "Cặp số nào sau đây tạo nên Public Key trong hệ mật mã RSA?",
    options: [
      "(p, q)",
      "(d, n)",
      "(φ(n), d)",
      "(e, n) — gồm số mũ công khai e và modulo n"
    ],
    correctIndex: 3, // D
  },
  // 17. [Dễ]
  {
    id: 17,
    difficulty: "easy",
    question: "Cặp số nào sau đây tạo nên Private Key trong hệ mật mã RSA?",
    options: [
      "(d, n) — gồm số mũ bí mật d và modulo n",
      "(e, n)",
      "(p, e)",
      "(q, φ(n))"
    ],
    correctIndex: 0, // A
  },
  // 18. [Dễ]
  {
    id: 18,
    difficulty: "easy",
    question: "Trong quy trình tạo chữ ký số RSA, người gửi dùng khóa nào để tạo chữ ký?",
    options: [
      "Public Key của người nhận",
      "Private Key của chính người gửi",
      "Public Key của chính người gửi",
      "Mã PIN tài khoản ngân hàng"
    ],
    correctIndex: 1, // B
  },
  // 19. [Dễ]
  {
    id: 19,
    difficulty: "easy",
    question: "Để xác minh chữ ký số của Alice gửi tới, Bob cần sử dụng khóa nào của Alice?",
    options: [
      "Private Key của Alice",
      "Private Key của Bob",
      "Public Key của Alice",
      "Khóa bí mật phiên AES"
    ],
    correctIndex: 2, // C
  },
  // 20. [Dễ]
  {
    id: 20,
    difficulty: "easy",
    question: "Tính chất 'chống chối bỏ' (Non-repudiation) của chữ ký số mang lại lợi ích gì?",
    options: [
      "Người nhận không thể xóa bỏ tin nhắn sau khi đã đọc",
      "Thông điệp không bao giờ bị nghẽn mạng trên đường truyền",
      "Kích thước tập tin được nén nhỏ đi 50%",
      "Người ký không thể phủ nhận việc mình đã ký thông điệp vì chỉ họ mới có Private Key tương ứng"
    ],
    correctIndex: 3, // D
  },

  // --- PHẦN II: MỨC ĐỘ VỪA (18 câu) ---
  // 21. [Vừa]
  {
    id: 21,
    difficulty: "medium",
    question: "Vì sao trong thực tế người ta KHÔNG dùng RSA để mã hóa trực tiếp các tệp tin có dung lượng lớn (video, database)?",
    options: [
      "Tốc độ tính toán của RSA rất chậm và tiêu tốn CPU hơn nhiều so với mã hóa đối xứng (như AES)",
      "Vì RSA không có khóa công khai",
      "Vì RSA không có khả năng giải mã ngược lại dữ liệu",
      "Vì RSA không thể kết hợp cùng hàm băm SHA"
    ],
    correctIndex: 0, // A
  },
  // 22. [Vừa]
  {
    id: 22,
    difficulty: "medium",
    question: "Hàm phi Euler φ(n) của số n = p × q (với p và q là hai số nguyên tố) được tính bằng công thức nào?",
    options: [
      "φ(n) = p × q - 1",
      "φ(n) = (p - 1) × (q - 1)",
      "φ(n) = p + q - 1",
      "φ(n) = p² × q²"
    ],
    correctIndex: 1, // B
  },
  // 23. [Vừa]
  {
    id: 23,
    difficulty: "medium",
    question: "Điều kiện toán học bắt buộc đối với số mũ công khai e khi thiết lập khóa RSA là gì?",
    options: [
      "e phải là một số chẵn",
      "e phải bằng chính xác số nguyên tố p",
      "gcd(e, φ(n)) = 1 (e và φ(n) phải nguyên tố cùng nhau và 1 < e < φ(n))",
      "e phải nhỏ hơn 10"
    ],
    correctIndex: 2, // C
  },
  // 24. [Vừa]
  {
    id: 24,
    difficulty: "medium",
    question: "Số mũ bí mật d được tính toán sao cho thỏa mãn phương trình đồng dư thức nào?",
    options: [
      "e × d = n",
      "d = e² mod n",
      "d = p + q",
      "e × d ≡ 1 (mod φ(n))"
    ],
    correctIndex: 3, // D
  },
  // 25. [Vừa]
  {
    id: 25,
    difficulty: "medium",
    question: "Vì sao giá trị số mũ e = 65537 (2¹⁶ + 1) lại được lựa chọn phổ biến nhất trong các thư viện RSA thực tế?",
    options: [
      "Có dạng nhị phân chỉ gồm 2 bit 1 (0x10001), tối ưu tốc độ tính lũy thừa modulo nhanh mà vẫn an toàn",
      "Đây là số nguyên tố duy nhất tồn tại trong toán học",
      "Quy định bắt buộc theo luật pháp quốc tế",
      "Là số nguyên tố lớn nhất mà máy tính có thể xử lý được"
    ],
    correctIndex: 0, // A
  },
  // 26. [Vừa]
  {
    id: 26,
    difficulty: "medium",
    question: "Cơ chế đệm OAEP (Optimal Asymmetric Encryption Padding) trong RSA được thiết kế nhằm mục đích gì?",
    options: [
      "Tăng kích thước tệp tin để chống virus",
      "Cung cấp cơ chế đệm an toàn ngẫu nhiên hóa bản mã, chống lại các cuộc tấn công toán học vào RSA nguyên bản (Textbook RSA)",
      "Nén dữ liệu văn bản trước khi băm",
      "Thay thế thuật toán Proof of Work"
    ],
    correctIndex: 1, // B
  },
  // 27. [Vừa]
  {
    id: 27,
    difficulty: "medium",
    question: "Tiêu chuẩn đệm cổ điển PKCS#1 v1.5 nổi tiếng trong lịch sử vì lỗ hổng bảo mật nghiêm trọng nào?",
    options: [
      "Lỗ hổng không sử dụng phép toán modulo",
      "Lỗ hổng làm lộ trực tiếp số nguyên tố p",
      "Lỗ hổng tấn công Padding Oracle (Bleichenbacher's attack) cho phép kẻ xấu giải mã tin nhắn",
      "Lỗ hổng làm máy chủ bị quá tải CPU"
    ],
    correctIndex: 2, // C
  },
  // 28. [Vừa]
  {
    id: 28,
    difficulty: "medium",
    question: "Trong thực tế ký số RSA, người ta ký lên thành phần nào của tài liệu/giao dịch?",
    options: [
      "Toàn bộ từng byte dữ liệu của toàn bộ tệp tin",
      "Khóa công khai Public Key của người nhận",
      "Giá trị Nonce của máy chủ",
      "Giá trị băm (Hash) của tài liệu/giao dịch để đảm bảo tốc độ và kích thước chữ ký nhỏ gọn cố định"
    ],
    correctIndex: 3, // D
  },
  // 29. [Vừa]
  {
    id: 29,
    difficulty: "medium",
    question: "Kỹ thuật định lý số dư Trung Hoa (CRT - Chinese Remainder Theorem) được ứng dụng trong RSA nhằm mục đích gì?",
    options: [
      "Tăng tốc độ giải mã và ký của Private Key lên tới 4 lần bằng cách tính toán riêng theo modulo p và q",
      "Thu nhỏ độ dài của Public Key về 0 byte",
      "Loại bỏ sự cần thiết của số nguyên tố q",
      "Tự động tạo chữ ký số không cần mã hóa"
    ],
    correctIndex: 0, // A
  },
  // 30. [Vừa]
  {
    id: 30,
    difficulty: "medium",
    question: "Hai số nguyên tố p và q khi sinh cặp khóa RSA cần thỏa mãn những tiêu chí nào?",
    options: [
      "Hai số p và q phải là các số nguyên tố chẵn liên tiếp",
      "Phải được sinh ngẫu nhiên độc lập, giữ bí mật tuyệt đối và có độ dài bit đủ lớn",
      "Hai số p và q bắt buộc phải bằng nhau (p = q)",
      "Hai số p và q phải được công bố công khai lên website"
    ],
    correctIndex: 1, // B
  },
  // 31. [Vừa]
  {
    id: 31,
    difficulty: "medium",
    question: "Độ dài khóa RSA 1024-bit hiện nay được các tổ chức an ninh tiêu chuẩn (như NIST) đánh giá như thế nào?",
    options: [
      "Là tiêu chuẩn an toàn cao cấp nhất hiện tại",
      "Có khả năng chống lại máy tính lượng tử tuyệt đối",
      "Không còn được khuyến nghị sử dụng vì năng lực tính toán hiện đại có thể bẻ khóa (khuyến nghị tối thiểu 2048-bit)",
      "Bắt buộc phải áp dụng trong các giao dịch ngân hàng"
    ],
    correctIndex: 2, // C
  },
  // 32. [Vừa]
  {
    id: 32,
    difficulty: "medium",
    question: "Mô hình 'Phong bì số' (Digital Envelope) trong mật mã học kết hợp RSA và AES như thế nào?",
    options: [
      "Dùng AES để nén file, sau đó bỏ qua bước mã hóa",
      "Dùng RSA để mã hóa tất cả các block blockchain",
      "Dùng SHA-256 để giải mã tệp tin",
      "Dùng mã hóa đối xứng AES để mã hóa dữ liệu lớn, sau đó dùng RSA mã hóa khóa phiên AES đó"
    ],
    correctIndex: 3, // D
  },
  // 33. [Vừa]
  {
    id: 33,
    difficulty: "medium",
    question: "Trong công nghệ Blockchain, tại sao thuật toán đường cong Elliptic (ECDSA/Ed25519) lại được ưu tiên sử dụng thay vì RSA?",
    options: [
      "Vì ECDSA cung cấp cùng mức độ bảo mật nhưng có kích thước khóa và chữ ký nhỏ hơn nhiều, giúp tiết kiệm dung lượng block",
      "Vì RSA không hỗ trợ việc tạo chữ ký số",
      "Vì RSA không có cơ chế khóa công khai",
      "Vì mạng blockchain không chấp nhận các phép toán modulo"
    ],
    correctIndex: 0, // A
  },
  // 34. [Vừa]
  {
    id: 34,
    difficulty: "medium",
    question: "Phép toán mã hóa một bản rõ m thành bản mã c trong RSA được biểu diễn bằng công thức nào?",
    options: [
      "c = m + e mod n",
      "c = mᵉ mod n",
      "c = (m × e) / n",
      "c = mᵈ mod n"
    ],
    correctIndex: 1, // B
  },
  // 35. [Vừa]
  {
    id: 35,
    difficulty: "medium",
    question: "Phép toán giải mã bản mã c trở lại bản rõ m ban đầu bằng khóa bí mật d trong RSA là công thức nào?",
    options: [
      "m = c × d mod n",
      "m = c - d mod n",
      "m = cᵈ mod n",
      "m = cᵉ mod φ(n)"
    ],
    correctIndex: 2, // C
  },
  // 36. [Vừa]
  {
    id: 36,
    difficulty: "medium",
    question: "Trong quy trình ký số RSA, chữ ký s được tạo ra từ mã băm h của tài liệu theo công thức nào?",
    options: [
      "s = h + d mod n",
      "s = hᵉ mod n",
      "s = (h × d) mod φ(n)",
      "s = hᵈ mod n (sử dụng khóa bí mật d)"
    ],
    correctIndex: 3, // D
  },
  // 37. [Vừa]
  {
    id: 37,
    difficulty: "medium",
    question: "Người nhận kiểm tra chữ ký số s của Alice bằng cách nào để đối chiếu với mã băm h?",
    options: [
      "Tính h' = sᵉ mod n (sử dụng Public Key của Alice) rồi so sánh h' với h",
      "Tính h' = s × e mod n",
      "Dùng Private Key của người nhận để giải mã s",
      "Chuyển đổi chuỗi s thành một Nonce mới"
    ],
    correctIndex: 0, // A
  },
  // 38. [Vừa]
  {
    id: 38,
    difficulty: "medium",
    question: "Tấn công phát lại (Replay Attack) đối với chữ ký số thường được phòng ngừa bằng cách nào?",
    options: [
      "Tăng kích thước khóa lên vô hạn",
      "Bổ sung dấu thời gian (Timestamp) hoặc số thứ tự giao dịch (Nonce / Non-repeating counter) vào thông điệp trước khi ký",
      "Xóa bỏ hoàn toàn khóa công khai khỏi mạng",
      "Chỉ cho phép một người ký duy nhất trên toàn mạng"
    ],
    correctIndex: 1, // B
  },

  // --- PHẦN III: MỨC ĐỘ KHÓ (12 câu) ---
  // 39. [Khó]
  {
    id: 39,
    difficulty: "hard",
    question: "Cho hai số nguyên tố p = 17 và q = 11. Giá trị của modulo n trong RSA là bao nhiêu?",
    options: [
      "n = 28",
      "n = 121",
      "n = 187 (17 × 11)",
      "n = 154"
    ],
    correctIndex: 2, // C
  },
  // 40. [Khó]
  {
    id: 40,
    difficulty: "hard",
    question: "Với p = 17 và q = 11, giá trị của hàm phi Euler φ(n) là bao nhiêu?",
    options: [
      "φ(n) = 28",
      "φ(n) = 176",
      "φ(n) = 187",
      "φ(n) = 160 (vì (17 - 1) × (11 - 1) = 16 × 10 = 160)"
    ],
    correctIndex: 3, // D
  },
  // 41. [Khó]
  {
    id: 41,
    difficulty: "hard",
    question: "Với φ(n) = 160 và chọn số mũ e = 7. Khóa bí mật d thỏa mãn 7 × d ≡ 1 (mod 160) có giá trị là bao nhiêu?",
    options: [
      "d = 23 (vì 7 × 23 = 161 = 1 × 160 + 1)",
      "d = 21",
      "d = 91",
      "d = 137"
    ],
    correctIndex: 0, // A
  },
  // 42. [Khó]
  {
    id: 42,
    difficulty: "hard",
    question: "Tính đúng đắn của thuật toán giải mã RSA (mᵉ)ᵈ ≡ m (mod n) được chứng minh dựa trên nền tảng toán học nào?",
    options: [
      "Định lý Pytago mở rộng",
      "Định lý Euler và Định lý Fermat nhỏ (Fermat's Little Theorem)",
      "Định lý giới hạn trung tâm xác suất thống kê",
      "Nguyên lý chuồng bồ câu Dirichlet"
    ],
    correctIndex: 1, // B
  },
  // 43. [Khó]
  {
    id: 43,
    difficulty: "hard",
    question: "Tại sao trong thực tế, nếu kẻ tấn công phân tích được modulo n thành p và q thì hệ thống RSA bị sụp đổ hoàn toàn?",
    options: [
      "Vì máy tính của người dùng sẽ bị tắt nguồn",
      "Vì các giao dịch trong quá khứ sẽ bị đảo ngược giá trị băm",
      "Vì khi biết p và q, kẻ tấn công dễ dàng tính ra φ(n) và từ đó suy ra Private Key d từ Public Key e",
      "Vì ngưỡng Target của Proof of Work sẽ tăng lên cực đại"
    ],
    correctIndex: 2, // C
  },
  // 44. [Khó]
  {
    id: 44,
    difficulty: "hard",
    question: "Thuật toán máy tính lượng tử nào đe dọa trực tiếp và có khả năng bẻ gãy hệ mật mã RSA trong thời gian đa thức?",
    options: [
      "Thuật toán tìm đường đi ngắn nhất Dijkstra",
      "Thuật toán tìm kiếm không gian cơ sở dữ liệu Grover",
      "Thuật toán Bellman-Ford",
      "Thuật toán Shor (Shor's Algorithm)"
    ],
    correctIndex: 3, // D
  },
  // 45. [Khó]
  {
    id: 45,
    difficulty: "hard",
    question: "Thuật toán lượng tử Grover ảnh hưởng chủ yếu đến loại mật mã nào và khác với thuật toán Shor như thế nào?",
    options: [
      "Grover giảm độ an toàn của hàm băm và mã đối xứng còn căn bậc hai (cần tăng độ dài khóa), chứ không phá hủy cấu trúc như Shor đối với RSA",
      "Grover chỉ dùng để bẻ khóa RSA trực tiếp trong 1 giây",
      "Grover chỉ áp dụng cho mạng xã hội",
      "Grover không thể thực thi trên máy tính lượng tử"
    ],
    correctIndex: 0, // A
  },
  // 46. [Khó]
  {
    id: 46,
    difficulty: "hard",
    question: "Nếu một siêu máy tính lượng tử đủ số lượng Qubit logic thực thi thành công thuật toán Shor, hậu quả lớn nhất là gì?",
    options: [
      "Hàm băm SHA-256 bị xóa khỏi bộ nhớ mạng Internet",
      "Hệ thống mật mã khóa công khai dựa trên phân tích số nguyên (RSA) và logarit rời rạc (ECC) có thể bị suy ra Private Key",
      "Cây Merkle trong mọi khối sẽ tự động bị phân mảnh",
      "Dung lượng lưu trữ của máy tính bị giảm xuống 0"
    ],
    correctIndex: 1, // B
  },
  // 47. [Khó]
  {
    id: 47,
    difficulty: "hard",
    question: "Tại sao chuẩn chữ ký số RSA hoàn toàn không phù hợp cho việc mở rộng thông lượng giao dịch (TPS) của các chuỗi khối hiện đại?",
    options: [
      "Vì RSA không tương thích với ngôn ngữ lập trình JavaScript",
      "Vì chữ ký RSA không thể lưu trữ trong cơ sở dữ liệu",
      "Kích thước chữ ký RSA (256-512 byte) lớn gấp 4-8 lần chữ ký ECDSA/Schnorr (64 byte), làm nghẽn băng thông lan truyền mạng P2P",
      "Vì người dùng bắt buộc phải gửi cả Private Key kèm theo giao dịch"
    ],
    correctIndex: 2, // C
  },
  // 48. [Khó]
  {
    id: 48,
    difficulty: "hard",
    question: "Hướng giải pháp dài hạn được giới an ninh mạng quốc tế (NIST) chuẩn hóa để thay thế RSA trước kỷ nguyên máy tính lượng tử là gì?",
    options: [
      "Quay trở lại sử dụng mật mã cổ điển Caesar",
      "Chuyển sang sử dụng thuật toán băm MD5 nhiều vòng lặp hơn",
      "Tăng kích thước khóa đối xứng DES lên 64 bit",
      "Mật mã hậu lượng tử (Post-Quantum Cryptography - PQC, tiêu biểu như Dilithium, Falcon, ML-KEM / Kyber)"
    ],
    correctIndex: 3, // D
  },
  // 49. [Khó]
  {
    id: 49,
    difficulty: "hard",
    question: "Tấn công Wiener (Wiener's Attack) khai thác điểm yếu nào trong quá trình thiết lập tham số RSA?",
    options: [
      "Khai thác trường hợp số mũ bí mật d được chọn quá nhỏ (d < ⅓ n^(1/4)) nhằm tăng tốc giải mã, cho phép tìm lại d bằng liên phân số",
      "Khai thác trường hợp số nguyên tố p là một số lẻ",
      "Khai thác trường hợp người dùng công khai Public Key",
      "Khai thác việc sử dụng định lý số dư Trung Hoa CRT"
    ],
    correctIndex: 0, // A
  },
  // 50. [Khó]
  {
    id: 50,
    difficulty: "hard",
    question: "Tấn công Coppersmith trong RSA thường được áp dụng thành công trong trường hợp nào?",
    options: [
      "Khi khóa bí mật d có kích thước lớn hơn 4096 bit",
      "Khi số mũ công khai e nhỏ (ví dụ e = 3) và một phần bản rõ được chia sẻ hoặc đệm không đủ an toàn",
      "Khi hai số nguyên tố p và q hoàn toàn khác biệt nhau",
      "Khi hàm băm SHA-256 được sử dụng cùng RSA-PSS"
    ],
    correctIndex: 1, // B
  }
];
