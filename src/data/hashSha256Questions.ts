export interface QuizQuestionItem {
  id: number;
  question: string;
  options: string[];
  correctIndex: number; // 0 = A, 1 = B, 2 = C, 3 = D
  difficulty: "easy" | "medium" | "hard";
}

/**
 * Bộ 54 câu hỏi trắc nghiệm chủ đề "Hàm băm & SHA-256"
 * Cấu trúc phân bố:
 * - Dễ (Easy): 27 câu
 * - Vừa (Medium): 15 câu
 * - Khó (Hard): 12 câu
 * 
 * Phân bố đáp án đúng:
 * A (index 0): 14 câu
 * B (index 1): 14 câu
 * C (index 2): 13 câu
 * D (index 3): 13 câu
 */
export const HASH_SHA256_54_QUESTIONS: QuizQuestionItem[] = [
  // 1. [Dễ]
  {
    id: 1,
    difficulty: "easy",
    question: "Hàm băm (hash function) là gì?",
    options: [
      "Hàm mã hóa có thể giải mã bằng khóa bí mật",
      "Thuật toán biến dữ liệu đầu vào thành giá trị băm có kích thước cố định",
      "Thuật toán nén dữ liệu để giảm dung lượng lưu trữ",
      "Thuật toán tạo khóa công khai trong mã hóa bất đối xứng"
    ],
    correctIndex: 1, // B
  },
  // 2. [Dễ]
  {
    id: 2,
    difficulty: "easy",
    question: "Biểu thức chuẩn nào mô tả nguyên lý hoạt động của hàm băm từ thông điệp M sang giá trị băm h?",
    options: [
      "h = H(M)",
      "M = H(h)",
      "H = M + h",
      "h = M / H"
    ],
    correctIndex: 0, // A
  },
  // 3. [Dễ]
  {
    id: 3,
    difficulty: "easy",
    question: "Kết quả của hàm băm còn thường được gọi bằng những thuật ngữ nào?",
    options: [
      "Private key và Public key",
      "Nonce và Target",
      "Plaintext và Ciphertext",
      "Hash code, hash value hoặc hash result"
    ],
    correctIndex: 3, // D
  },
  // 4. [Dễ]
  {
    id: 4,
    difficulty: "easy",
    question: "Tính chất 'một chiều' (pre-image resistance) của hàm băm có nghĩa là gì?",
    options: [
      "Dữ liệu chỉ được phép truyền theo một chiều trong mạng ngang hàng",
      "Dễ tính giá trị băm từ dữ liệu, nhưng rất khó tìm ngược lại dữ liệu ban đầu từ giá trị băm",
      "Hàm băm chỉ tiếp nhận một định dạng đầu vào duy nhất",
      "Hàm băm luôn cho ra chuỗi ký tự chỉ đi theo chiều số tăng dần"
    ],
    correctIndex: 1, // B
  },
  // 5. [Dễ]
  {
    id: 5,
    difficulty: "easy",
    question: "Phép toán số học nào thường được sử dụng làm ví dụ minh họa trực quan cho hàm một chiều?",
    options: [
      "f(x) = 2x + 1",
      "f(x) = x / 2",
      "f(x) = x² mod n",
      "f(x) = x + 10"
    ],
    correctIndex: 2, // C
  },
  // 6. [Dễ]
  {
    id: 6,
    difficulty: "easy",
    question: "Độ dài của giá trị băm phụ thuộc chủ yếu vào yếu tố nào?",
    options: [
      "Dung lượng của tập tin đầu vào",
      "Tốc độ đường truyền Internet tại thời điểm tính toán",
      "Tên gọi và định dạng tệp tin ban đầu",
      "Thuật toán băm được quy định (như SHA-256 luôn cho ra 256 bit)"
    ],
    correctIndex: 3, // D
  },
  // 7. [Dễ]
  {
    id: 7,
    difficulty: "easy",
    question: "Hiện tượng Collision (đụng độ / va chạm) trong hàm băm được hiểu là gì?",
    options: [
      "Hai đầu vào khác nhau lại cho ra cùng một giá trị băm giống hệt nhau",
      "Hai tập tin có cùng dung lượng lưu trữ trên đĩa cứng",
      "Một tệp tin có cùng lúc hai khóa bí mật khác nhau",
      "Một giá trị băm bị thay đổi chiều dài sau khi lưu trữ"
    ],
    correctIndex: 0, // A
  },
  // 8. [Dễ]
  {
    id: 8,
    difficulty: "easy",
    question: "Kháng đụng độ yếu (weak collision resistance / second preimage) yêu cầu điều gì?",
    options: [
      "Không thể tính toán được bất kỳ giá trị băm nào từ M1",
      "Với thông điệp M1 đã cho trước, rất khó tìm được thông điệp M2 khác sao cho H(M2) = H(M1)",
      "Không tồn tại bất kỳ thông điệp nào trên mạng",
      "Không thể thay đổi dữ liệu sau khi gửi đi"
    ],
    correctIndex: 1, // B
  },
  // 9. [Dễ]
  {
    id: 9,
    difficulty: "easy",
    question: "Kháng đụng độ mạnh (strong collision resistance) yêu cầu điều gì?",
    options: [
      "Hàm băm phải có khả năng kéo dài độ dài vô hạn",
      "Chỉ được phép băm dữ liệu một lần duy nhất trong ngày",
      "Rất khó để tìm ra bất kỳ cặp thông điệp khác nhau (M1 ≠ M2) sao cho H(M1) = H(M2)",
      "Bắt buộc giá trị băm phải chứa ít nhất 10 số không ở đầu"
    ],
    correctIndex: 2, // C
  },
  // 10. [Dễ]
  {
    id: 10,
    difficulty: "easy",
    question: "Thuật toán SHA-256 thuộc về họ thuật toán mật mã nào?",
    options: [
      "Nhóm MD-X",
      "Nhóm RSA-X",
      "Nhóm AES-X",
      "Nhóm SHA-X (Secure Hash Algorithm)"
    ],
    correctIndex: 3, // D
  },
  // 11. [Dễ]
  {
    id: 11,
    difficulty: "easy",
    question: "Thuật toán băm MD5 hiện nay được đánh giá như thế nào về mặt an ninh mạng?",
    options: [
      "Luôn luôn an toàn tuyệt đối trong mọi trường hợp",
      "Đã bị tìm thấy va chạm thực tế và không còn được xem là an toàn",
      "Chỉ được dùng cho hệ thống quân đội tối mật",
      "Là thuật toán mã hóa đối xứng hàng đầu"
    ],
    correctIndex: 1, // B
  },
  // 12. [Dễ]
  {
    id: 12,
    difficulty: "easy",
    question: "Thuật toán SHA-1 trong tài liệu lý thuyết còn thường được gọi bằng tên nào?",
    options: [
      "SHA32",
      "SHA64",
      "SHA160",
      "SHA512"
    ],
    correctIndex: 2, // C
  },
  // 13. [Dễ]
  {
    id: 13,
    difficulty: "easy",
    question: "Giá trị băm của thuật toán SHA-1 có độ dài đầu ra là bao nhiêu bit?",
    options: [
      "160 bit (20 byte)",
      "128 bit",
      "256 bit",
      "512 bit"
    ],
    correctIndex: 0, // A
  },
  // 14. [Dễ]
  {
    id: 14,
    difficulty: "easy",
    question: "Giá trị băm đầu ra của SHA-256 luôn luôn có kích thước cố định là bao nhiêu bit?",
    options: [
      "128 bit",
      "160 bit",
      "256 bit (32 byte)",
      "512 bit"
    ],
    correctIndex: 2, // C
  },
  // 15. [Dễ]
  {
    id: 15,
    difficulty: "easy",
    question: "Một giá trị băm SHA-256 thường được biểu diễn bằng bao nhiêu ký tự trong hệ thập lục phân (hex)?",
    options: [
      "16 ký tự",
      "32 ký tự",
      "48 ký tự",
      "64 ký tự (mỗi ký tự 4 bit)"
    ],
    correctIndex: 3, // D
  },
  // 16. [Vừa]
  {
    id: 16,
    difficulty: "medium",
    question: "Nếu thay đổi một phần rất nhỏ (thậm chí 1 bit) của dữ liệu đầu vào, điều gì thường xảy ra với giá trị băm?",
    options: [
      "Giá trị băm gần như không đổi, chỉ đổi 1 ký tự cuối",
      "Giá trị băm thay đổi hoàn toàn và khó dự đoán (Hiệu ứng tuyết lở / Avalanche Effect)",
      "Giá trị băm luôn luôn quay về toàn số 0",
      "Độ dài của chuỗi băm sẽ tăng gấp đôi"
    ],
    correctIndex: 1, // B
  },
  // 17. [Dễ]
  {
    id: 17,
    difficulty: "easy",
    question: "Một ứng dụng then chốt của hàm băm trong truyền nhận tệp tin qua mạng là gì?",
    options: [
      "Kiểm tra tính toàn vẹn của dữ liệu (Data Integrity)",
      "Tăng dung lượng lưu trữ của ổ cứng",
      "Tăng tốc độ xung nhịp xử lý của CPU",
      "Tạo hình ảnh và video chất lượng cao"
    ],
    correctIndex: 0, // A
  },
  // 18. [Dễ]
  {
    id: 18,
    difficulty: "easy",
    question: "Tại sao người ta có thể sử dụng hàm băm để kiểm tra tính toàn vẹn của một tập tin?",
    options: [
      "Hàm băm làm cho tập tin không bao giờ bị xóa",
      "Bằng cách so sánh giá trị hash trước và sau khi truyền/tải tập tin",
      "Hàm băm tự động sửa chữa các đoạn dữ liệu bị hỏng",
      "Hàm băm nén tập tin nhỏ gọn thành 0 byte"
    ],
    correctIndex: 1, // B
  },
  // 19. [Dễ]
  {
    id: 19,
    difficulty: "easy",
    question: "Trong quản lý tài khoản người dùng, hàm băm được áp dụng phổ biến như thế nào đối với mật khẩu?",
    options: [
      "Lưu mật khẩu trực tiếp dưới dạng văn bản rõ ràng (Plaintext)",
      "Chụp ảnh mật khẩu lưu trữ trong thư viện ảnh",
      "Lưu mật khẩu dưới dạng giá trị băm (Hash) để đảm bảo an toàn",
      "Lưu mật khẩu trong Merkle Root của trình duyệt"
    ],
    correctIndex: 2, // C
  },
  // 20. [Dễ]
  {
    id: 20,
    difficulty: "easy",
    question: "Khi người dùng đăng nhập hệ thống, quy trình xác thực mật khẩu bằng hàm băm diễn ra như thế nào?",
    options: [
      "Hệ thống giải mã chuỗi hash đã lưu để lấy lại mật khẩu ban đầu",
      "Hệ thống gửi mật khẩu dạng công khai lên máy chủ",
      "Hệ thống đổi chuỗi hash thành một khóa riêng RSA mới",
      "Băm mật khẩu người dùng vừa nhập rồi so sánh kết quả với giá trị hash đã lưu trữ"
    ],
    correctIndex: 3, // D
  },
  // 21. [Vừa]
  {
    id: 21,
    difficulty: "medium",
    question: "Điểm khác biệt cơ bản nhất giữa Hashing (băm) và Encryption (mã hóa) là gì?",
    options: [
      "Hashing được thiết kế là phép biến đổi một chiều; Encryption có cơ chế giải mã bằng khóa",
      "Cả hai cơ chế đều luôn luôn không thể đảo ngược trong mọi tình huống",
      "Encryption không bao giờ sử dụng bất kỳ loại khóa nào",
      "Hashing luôn luôn tạo ra dữ liệu có độ dài dài hơn dữ liệu đầu vào"
    ],
    correctIndex: 0, // A
  },
  // 22. [Dễ]
  {
    id: 22,
    difficulty: "easy",
    question: "Trong kiến trúc khối Blockchain, Block Header luôn chứa mã băm của khối nào?",
    options: [
      "Khối tiếp theo trong tương lai",
      "Khối đứng ngay trước đó (Previous Block Hash)",
      "Tất cả các khối được tạo ra trong ngày",
      "Chỉ duy nhất khối khởi nguồn Genesis Block"
    ],
    correctIndex: 1, // B
  },
  // 23. [Vừa]
  {
    id: 23,
    difficulty: "medium",
    question: "Nếu dữ liệu giao dịch trong một khối blockchain bị chỉnh sửa trái phép, điều gì chắc chắn xảy ra?",
    options: [
      "Giá trị băm của khối đó vẫn giữ nguyên không đổi",
      "Giá trị Nonce sẽ tự động giữ nguyên và duy trì tính hợp lệ",
      "Giá trị băm của khối bị thay đổi và làm gãy liên kết chuỗi",
      "Merkle Root của khối hoàn toàn không bị ảnh hưởng"
    ],
    correctIndex: 2, // C
  },
  // 24. [Vừa]
  {
    id: 24,
    difficulty: "medium",
    question: "Vì sao việc thay đổi dữ liệu trong một khối trong quá khứ có thể ảnh hưởng đến toàn bộ chuỗi khối phía sau?",
    options: [
      "Vì các khối được liên kết mật mã chặt chẽ bằng Previous Block Hash",
      "Vì tất cả các khối trong blockchain đều dùng chung một timestamp",
      "Vì mỗi khối đều có cùng một số lượng Nonce cố định",
      "Vì toàn bộ các khối đều có danh sách giao dịch trùng khớp"
    ],
    correctIndex: 0, // A
  },
  // 25. [Vừa]
  {
    id: 25,
    difficulty: "medium",
    question: "Trong mạng Bitcoin, thuật toán SHA-256 được sử dụng nổi bật và cốt lõi nhất trong cơ chế nào?",
    options: [
      "Cơ chế Proof of Stake (Bằng chứng cổ phần)",
      "Cơ chế Proof of Work (Bằng chứng công việc đào khối)",
      "Cơ chế nén dữ liệu mạng ngang hàng",
      "Cơ chế quản lý danh bạ ví người dùng"
    ],
    correctIndex: 1, // B
  },
  // 26. [Dễ]
  {
    id: 26,
    difficulty: "easy",
    question: "Trường Nonce (Number used once) trong Proof of Work đóng vai trò gì?",
    options: [
      "Là dữ liệu được thợ đào thay đổi liên tục để thử tạo ra hash đáp ứng điều kiện mục tiêu",
      "Là mật khẩu đăng nhập của thợ đào vào mạng Bitcoin",
      "Là giá trị cố định không bao giờ thay đổi của khối",
      "Là chữ ký số công khai của giao dịch đầu tiên"
    ],
    correctIndex: 0, // A
  },
  // 27. [Dễ]
  {
    id: 27,
    difficulty: "easy",
    question: "Thời gian trung bình mục tiêu để mạng Bitcoin tạo ra một khối mới là khoảng bao lâu?",
    options: [
      "1 phút",
      "5 phút",
      "10 phút",
      "60 phút"
    ],
    correctIndex: 2, // C
  },
  // 28. [Dễ]
  {
    id: 28,
    difficulty: "easy",
    question: "Trong giao thức Bitcoin, độ khó đào (Difficulty) được mạng tự động điều chỉnh lại sau mỗi bao nhiêu khối?",
    options: [
      "100 khối",
      "512 khối",
      "1000 khối",
      "2016 khối (khoảng 2 tuần)"
    ],
    correctIndex: 3, // D
  },
  // 29. [Vừa]
  {
    id: 29,
    difficulty: "medium",
    question: "Trong cơ chế Target của Proof of Work, khi giá trị Target càng nhỏ thì điều gì xảy ra?",
    options: [
      "Bài toán khai thác trở nên dễ dàng hơn nhiều",
      "Bài toán khai thác trở nên khó hơn (xác suất tìm được hash hợp lệ thấp hơn)",
      "Độ dài chuỗi băm sẽ tự động dài hơn 256 bit",
      "Khối không cần chứa trường Nonce nữa"
    ],
    correctIndex: 1, // B
  },
  // 30. [Dễ]
  {
    id: 30,
    difficulty: "easy",
    question: "Các mã băm có nhiều số 0 ở đầu (leading zeros) trong Proof of Work thường được dùng để minh họa điều gì?",
    options: [
      "Điều kiện giá trị số của mã băm nhỏ hơn hoặc bằng Target quy định",
      "Tập tin của khối có kích thước bằng 0",
      "Số lượng giao dịch trong khối đã bị xóa hết",
      "Số lượng node trong mạng đang bị ngắt kết nối"
    ],
    correctIndex: 0, // A
  },
  // 31. [Vừa]
  {
    id: 31,
    difficulty: "medium",
    question: "Thuật toán SHA-256 có tổng cộng bao nhiêu khả năng đầu ra khác nhau về mặt lý thuyết?",
    options: [
      "2^64",
      "2^128",
      "2^160",
      "2^256"
    ],
    correctIndex: 3, // D
  },
  // 32. [Vừa]
  {
    id: 32,
    difficulty: "medium",
    question: "Vì sao về mặt lý thuyết toán học, va chạm (Collision) trong SHA-256 chắc chắn vẫn tồn tại?",
    options: [
      "Vì SHA-256 không thể tạo ra giá trị đầu ra",
      "Vì số lượng đầu vào tiềm năng là vô hạn trong khi số đầu ra là hữu hạn (2^256)",
      "Vì SHA-256 luôn luôn tạo ra cùng một kết quả cho mọi thông điệp",
      "Vì SHA-256 thuộc nhóm thuật toán mã hóa đối xứng"
    ],
    correctIndex: 1, // B
  },
  // 33. [Vừa]
  {
    id: 33,
    difficulty: "medium",
    question: "Khái niệm nào gần nhất với phát biểu: 'Rất khó tìm ra dữ liệu đầu vào tạo ra một giá trị băm cho trước'?",
    options: [
      "Preimage resistance (Tính kháng tiền ảnh)",
      "Data Compression (Nén dữ liệu)",
      "Symmetric Encryption (Mã hóa đối xứng)",
      "String Concatenation (Nối chuỗi)"
    ],
    correctIndex: 0, // A
  },
  // 34. [Khó]
  {
    id: 34,
    difficulty: "hard",
    question: "Giả sử thông điệp M1 đã biết trước và kẻ tấn công muốn tìm M2 ≠ M1 sao cho H(M2) = H(M1). Đây là bài toán thách thức tính chất nào?",
    options: [
      "Strong collision resistance",
      "Weak collision resistance (Kháng đụng độ yếu / Kháng tiền ảnh thứ hai)",
      "Encryption and Decryption",
      "Key generation protocol"
    ],
    correctIndex: 1, // B
  },
  // 35. [Khó]
  {
    id: 35,
    difficulty: "hard",
    question: "Kẻ tấn công chủ động tìm kiếm bất kỳ hai thông điệp nào M1 ≠ M2 sao cho H(M1) = H(M2). Tính chất nào của hàm băm bị nhắm tới?",
    options: [
      "Weak collision resistance",
      "Confidentiality (Tính bí mật)",
      "Availability (Tính sẵn sàng)",
      "Strong collision resistance (Kháng đụng độ mạnh)"
    ],
    correctIndex: 3, // D
  },
  // 36. [Vừa]
  {
    id: 36,
    difficulty: "medium",
    question: "Trong cấu trúc Merkle Tree, nếu một transaction bị thay đổi thì điều gì sẽ xảy ra?",
    options: [
      "Chỉ transaction đó đổi, Merkle Root chắc chắn không thay đổi",
      "Sự thay đổi lan truyền lên các nút cha và cuối cùng làm thay đổi Merkle Root",
      "Chỉ có dấu thời gian của block bị sửa đổi",
      "Previous block hash tự động phục hồi lại như cũ"
    ],
    correctIndex: 1, // B
  },
  // 37. [Dễ]
  {
    id: 37,
    difficulty: "easy",
    question: "Merkle Root trong Block Header có vai trò gì?",
    options: [
      "Đại diện bằng một giá trị băm duy nhất cho toàn bộ tập dữ liệu giao dịch trong cây",
      "Lưu trữ mật khẩu bảo mật của người đào khối",
      "Thay thế hoàn toàn vai trò của trường Nonce",
      "Là khóa riêng dùng để ký giao dịch"
    ],
    correctIndex: 0, // A
  },
  // 38. [Dễ]
  {
    id: 38,
    difficulty: "easy",
    question: "Một ưu điểm lớn của Merkle Tree được ứng dụng trong blockchain là gì?",
    options: [
      "Làm cho block không cần phải tính hash nữa",
      "Xóa các transaction cũ khỏi chuỗi blockchain",
      "Cho phép xác minh tính hợp lệ của giao dịch hiệu quả mà không cần tải toàn bộ dữ liệu (SPV)",
      "Tăng kích thước của từng transaction để an toàn hơn"
    ],
    correctIndex: 2, // C
  },
  // 39. [Dễ]
  {
    id: 39,
    difficulty: "easy",
    question: "Quy trình xây dựng Merkle Tree cơ bản bắt đầu như thế nào?",
    options: [
      "Tạo trường Nonce trước",
      "Tạo Previous Block Hash trước",
      "Mã hóa toàn bộ thân khối trước",
      "Băm từng dữ liệu giao dịch trước để tạo thành các nút lá"
    ],
    correctIndex: 3, // D
  },
  // 40. [Vừa]
  {
    id: 40,
    difficulty: "medium",
    question: "Nếu có 8 giao dịch và mỗi giao dịch tương ứng với một lá của Merkle Tree, cây Merkle sẽ có bao nhiêu lá?",
    options: [
      "2 lá",
      "4 lá",
      "8 lá",
      "16 lá"
    ],
    correctIndex: 2, // C
  },
  // 41. [Khó]
  {
    id: 41,
    difficulty: "hard",
    question: "Muốn chứng minh một giao dịch thuộc Merkle Tree mà không cần tải toàn bộ các giao dịch trong khối, cần thông tin nào?",
    options: [
      "Chỉ cần mã định danh của transaction đó",
      "Các giá trị băm anh em cần thiết trên đường đi tới Merkle Root (Merkle Proof)",
      "Toàn bộ Private Key của tất cả các validator trong mạng",
      "Toàn bộ bản sao lưu của chuỗi khối từ Genesis Block"
    ],
    correctIndex: 1, // B
  },
  // 42. [Vừa]
  {
    id: 42,
    difficulty: "medium",
    question: "Tại sao việc đưa Merkle Root vào Block Header lại đặc biệt hữu ích trong blockchain?",
    options: [
      "Tóm tắt bằng một hash duy nhất trạng thái toàn bộ các transaction trong block",
      "Thay thế toàn bộ phần body không cần lưu giao dịch nữa",
      "Tạo mật khẩu cho các miner tham gia",
      "Giúp block không cần liên kết Previous Hash nữa"
    ],
    correctIndex: 0, // A
  },
  // 43. [Vừa]
  {
    id: 43,
    difficulty: "medium",
    question: "Nếu hai tập tin hoàn toàn giống hệt nhau được băm bằng cùng một thuật toán SHA-256, điều gì chắc chắn ĐÚNG?",
    options: [
      "Giá trị băm chắc chắn phải khác nhau",
      "Một trong hai tập tin sẽ bị lỗi băm",
      "Giá trị băm chắc chắn phải giống hệt nhau",
      "Giá trị băm phụ thuộc vào tên tập tin"
    ],
    correctIndex: 2, // C
  },
  // 44. [Khó]
  {
    id: 44,
    difficulty: "hard",
    question: "Một website công bố mã SHA-256 của tập tin A. Người dùng tải về và tự tính SHA-256 thấy khác. Kết luận nào là phù hợp nhất?",
    options: [
      "Hai tập tin chắc chắn giống hệt nhau",
      "Thuật toán SHA-256 đã chuyển đổi sang cơ chế mã hóa",
      "Có dấu hiệu tập tin người dùng nhận được khác với tập tin đã được công bố",
      "Mã hash khác nhau nhưng nội dung tập tin vẫn bảo toàn nguyên vẹn"
    ],
    correctIndex: 2, // C
  },
  // 45. [Vừa]
  {
    id: 45,
    difficulty: "medium",
    question: "Tại sao không thể sử dụng thuật toán SHA-256 như một công cụ 'giải mã' để khôi phục dữ liệu gốc?",
    options: [
      "Vì SHA-256 không tiếp nhận bất kỳ dữ liệu đầu vào nào",
      "Vì SHA-256 chỉ áp dụng cho định dạng hình ảnh",
      "Vì chuỗi hash SHA-256 luôn dài vô hạn",
      "Vì SHA-256 được thiết kế theo nguyên lý một chiều không thể đảo ngược"
    ],
    correctIndex: 3, // D
  },
  // 46. [Khó]
  {
    id: 46,
    difficulty: "hard",
    question: "Nếu một blockchain sử dụng một hàm băm yếu và kẻ tấn công tạo được va chạm (collision) phù hợp, rủi ro lớn nhất là gì?",
    options: [
      "Có thể làm suy yếu hoặc vô hiệu hóa việc phát hiện dữ liệu giao dịch bị thay đổi",
      "Làm tăng tốc độ đường truyền Internet toàn cầu",
      "Làm cho giá trị hash biến thành một khóa riêng",
      "Tự động tăng số lượng node trong mạng lên gấp đôi"
    ],
    correctIndex: 0, // A
  },
  // 47. [Vừa]
  {
    id: 47,
    difficulty: "medium",
    question: "Lợi ích chính của việc hàm băm biến đổi dữ liệu thành đầu ra có kích thước cố định là gì?",
    options: [
      "Đảm bảo dữ liệu luôn luôn được giữ bí mật",
      "Làm cho mọi tập tin trên thế giới có cùng dung lượng",
      "Loại bỏ hoàn toàn mọi khả năng va chạm trong toán học",
      "Tạo một dạng dấu vân tay kỹ thuật số ngắn gọn, chuẩn hóa, thuận tiện để so sánh"
    ],
    correctIndex: 3, // D
  },
  // 48. [Khó]
  {
    id: 48,
    difficulty: "hard",
    question: "Một người nói: 'Hai file có cùng mã SHA-256 thì chắc chắn về mặt toán học chúng là cùng một file.' Điểm sai chính của câu nói này là gì?",
    options: [
      "Độ dài của chuỗi băm luôn luôn thay đổi liên tục",
      "Thuật toán SHA-256 không có tính chất tất định",
      "Vẫn tồn tại khả năng va chạm (collision) về mặt lý thuyết toán học dù trên thực tế rất khó tìm",
      "Hai file giống nhau luôn luôn có giá trị hash khác nhau"
    ],
    correctIndex: 2, // C
  },
  // 49. [Khó]
  {
    id: 49,
    difficulty: "hard",
    question: "Trong mạng Bitcoin, nếu thợ đào sửa transaction trong một block rồi giữ nguyên Nonce cũ, điều gì hợp lý nhất?",
    options: [
      "Mã hash của block chắc chắn vẫn hợp lệ như cũ",
      "Previous Block Hash sẽ tự động sửa lại tương thích",
      "Merkle Root không liên quan gì đến danh sách giao dịch",
      "Hash của block sẽ thay đổi và có thể không còn đáp ứng điều kiện Target nữa"
    ],
    correctIndex: 3, // D
  },
  // 50. [Khó]
  {
    id: 50,
    difficulty: "hard",
    question: "Một block có Merkle Root hoàn toàn đúng nhưng trường Previous Block Hash bị sai. Điều gì sẽ xảy ra?",
    options: [
      "Liên kết chuỗi bị phá vỡ và block bị từ chối dù cây Merkle của block hợp lệ",
      "Block vẫn liên kết hoàn hảo với block trước đó",
      "Thuật toán SHA-256 tự động sửa trường Previous Hash",
      "Các transaction trong block tự động biến mất"
    ],
    correctIndex: 0, // A
  },
  // 51. [Khó]
  {
    id: 51,
    difficulty: "hard",
    question: "Phát biểu nào sau đây phân biệt đúng và chuẩn xác vai trò của Merkle Root và Previous Block Hash?",
    options: [
      "Cả hai giá trị đều chỉ phục vụ đại diện cho trường Nonce",
      "Merkle Root tóm tắt các transaction; Previous Block Hash liên kết với block trước đó",
      "Merkle Root dùng để liên kết chuỗi; Previous Block Hash tóm tắt các transaction",
      "Cả hai giá trị đều là mật khẩu của validator"
    ],
    correctIndex: 1, // B
  },
  // 52. [Khó]
  {
    id: 52,
    difficulty: "hard",
    question: "Nếu một người chỉ có một Merkle Proof hợp lệ cho transaction X và Merkle Root của block, họ có thể làm được gì?",
    options: [
      "Khôi phục khóa riêng Private Key của tất cả mọi người",
      "Đảo ngược thuật toán SHA-256 để tìm thân khối",
      "Kiểm tra và xác minh transaction X có nằm trong block tương ứng với Merkle Root đó hay không",
      "Tự động tạo ra một block mới chắc chắn hợp lệ"
    ],
    correctIndex: 2, // C
  },
  // 53. [Khó]
  {
    id: 53,
    difficulty: "hard",
    question: "Một hàm băm có đầu ra cố định 256 bit nhưng nhận đầu vào có độ dài tùy ý. Điều này dẫn đến nhận xét toán học nào đúng?",
    options: [
      "Số lượng đầu vào và đầu ra là hoàn toàn bằng nhau",
      "Hàm băm không thể dùng để kiểm tra tính toàn vẹn dữ liệu",
      "Không bao giờ có thể xảy ra va chạm",
      "Có nhiều đầu vào tiềm năng hơn số đầu ra (2^256), nên va chạm là khả dĩ về mặt toán học"
    ],
    correctIndex: 3, // D
  },
  // 54. [Khó]
  {
    id: 54,
    difficulty: "hard",
    question: "Nếu thuật toán SHA-256 bị đảo ngược một cách hiệu quả trong thực tế, tính chất nào sau đây bị ảnh hưởng trực tiếp nhất?",
    options: [
      "Tính chất một chiều (Pre-image resistance)",
      "Quy định kích thước khối của blockchain",
      "Số lượng transaction tối đa trong một block",
      "Độ chính xác của Timestamp trên mạng"
    ],
    correctIndex: 0, // A
  }
];
