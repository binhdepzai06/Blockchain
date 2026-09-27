import type { QuizQuestionItem } from "./hashSha256Questions";

/**
 * Bộ 53 câu hỏi trắc nghiệm chủ đề "Khai thác & Proof of Work (PoW)"
 * Dựa trên tài liệu slide và đề cương chuẩn:
 * - Dễ (Easy): 20 câu
 * - Vừa (Medium): 20 câu
 * - Khó (Hard): 13 câu
 * 
 * Phân bố đáp án đúng:
 * A (index 0): 13 câu
 * B (index 1): 13 câu
 * C (index 2): 14 câu
 * D (index 3): 13 câu
 * Tổng: 53 câu
 */
export const MINING_POW_53_QUESTIONS: QuizQuestionItem[] = [
  // 1. [Dễ]
  {
    id: 1,
    difficulty: "easy",
    question: "PoW (Proof of Work) là cơ chế gì trong hệ thống blockchain?",
    options: [
      "Cơ chế chứng minh quyền sở hữu tài sản kỹ thuật số",
      "Cơ chế yêu cầu thực hiện công việc tính toán để tạo và xác nhận block mới",
      "Cơ chế mã hóa toàn bộ cơ sở dữ liệu phân tán",
      "Cơ chế bảo mật và lưu trữ mật khẩu của người dùng"
    ],
    correctIndex: 1, // B
  },
  // 2. [Dễ]
  {
    id: 2,
    difficulty: "easy",
    question: "Trong cơ chế PoW, công việc chủ yếu của thợ đào (miner) là gì?",
    options: [
      "Xóa các giao dịch cũ để giải phóng bộ nhớ của mạng",
      "Tạo cặp khóa bí mật và khóa công khai cho người dùng",
      "Tìm một giá trị hash đáp ứng điều kiện độ khó (nhỏ hơn hoặc bằng Target)",
      "Tùy ý sửa đổi Merkle Root để tăng tốc độ mạng"
    ],
    correctIndex: 2, // C
  },
  // 3. [Dễ]
  {
    id: 3,
    difficulty: "easy",
    question: "Trường Nonce trong cơ chế Proof of Work đóng vai trò là gì?",
    options: [
      "Một giá trị số được thay đổi liên tục để thử tạo ra các kết quả hash khác nhau",
      "Tên một loại đồng tiền điện tử phụ trong mạng",
      "Mã băm đại diện cho toàn bộ cây Merkle",
      "Địa chỉ IP cố định của node đào khối"
    ],
    correctIndex: 0, // A
  },
  // 4. [Dễ]
  {
    id: 4,
    difficulty: "easy",
    question: "Điều kiện then chốt để một block được xem là hợp lệ trong PoW được mô tả bằng khái niệm nào?",
    options: [
      "Username của thợ đào",
      "Password bảo mật của mạng",
      "Địa chỉ ví nhận thưởng",
      "Target (ngưỡng mục tiêu độ khó)"
    ],
    correctIndex: 3, // D
  },
  // 5. [Dễ]
  {
    id: 5,
    difficulty: "easy",
    question: "Nếu mã hash của block mà thợ đào tìm được nhỏ hơn hoặc bằng Target thì điều gì xảy ra?",
    options: [
      "Kết quả đó đáp ứng điều kiện PoW và block được công nhận hợp lệ",
      "Thợ đào bắt buộc phải xóa block đó đi",
      "Toàn bộ giao dịch trong block bị hủy bỏ",
      "Ngưỡng Target sẽ tự động biến mất khỏi mạng"
    ],
    correctIndex: 0, // A
  },
  // 6. [Dễ]
  {
    id: 6,
    difficulty: "easy",
    question: "Ngưỡng Target trong Proof of Work được sử dụng để làm gì?",
    options: [
      "Lưu trữ nội dung chi tiết các giao dịch",
      "Xác định mức độ khó của bài toán khai thác khối",
      "Lưu trữ khóa riêng của thợ đào",
      "Xác định định danh tên máy chủ đào coin"
    ],
    correctIndex: 1, // B
  },
  // 7. [Dễ]
  {
    id: 7,
    difficulty: "easy",
    question: "Mạng Bitcoin hướng tới thời gian trung bình tạo ra một block mới là khoảng bao lâu?",
    options: [
      "1 phút",
      "5 phút",
      "10 phút",
      "60 phút"
    ],
    correctIndex: 2, // C
  },
  // 8. [Dễ]
  {
    id: 8,
    difficulty: "easy",
    question: "Mạng Bitcoin tự động điều chỉnh độ khó khai thác sau mỗi chu kỳ bao nhiêu block?",
    options: [
      "100 block",
      "1000 block",
      "10000 block",
      "2016 block (khoảng 2 tuần)"
    ],
    correctIndex: 3, // D
  },
  // 9. [Dễ]
  {
    id: 9,
    difficulty: "easy",
    question: "Khi ngưỡng Target trong PoW càng nhỏ thì bài toán khai thác sẽ như thế nào?",
    options: [
      "Bài toán khai thác trở nên dễ dàng hơn nhiều",
      "Bài toán khai thác trở nên khó hơn vì tập hợp hash thỏa mãn bị thu hẹp",
      "Độ khó hoàn toàn không thay đổi",
      "Thợ đào không cần phải tính toán hash nữa"
    ],
    correctIndex: 1, // B
  },
  // 10. [Dễ]
  {
    id: 10,
    difficulty: "easy",
    question: "Khái niệm 'Leading zeros' (các số 0 ở đầu chuỗi hash) thường được dùng để minh họa điều gì?",
    options: [
      "Số lượng giao dịch trong khối bằng 0",
      "Kích thước dung lượng của block",
      "Giá trị số của mã hash đủ nhỏ để thỏa mãn điều kiện độ khó (Target)",
      "Số lượng thợ đào đang tham gia vào mạng"
    ],
    correctIndex: 2, // C
  },
  // 11. [Dễ]
  {
    id: 11,
    difficulty: "easy",
    question: "Trong Block Header, thành phần nào có nhiệm vụ liên kết block hiện tại với block đứng trước?",
    options: [
      "Previous Block Hash (mã băm của khối trước)",
      "Timestamp (dấu thời gian)",
      "Trường số nguyên Nonce",
      "Tổng số lượng giao dịch trong block"
    ],
    correctIndex: 0, // A
  },
  // 12. [Dễ]
  {
    id: 12,
    difficulty: "easy",
    question: "Merkle Root nằm trong Block Header đại diện chủ yếu cho thành phần nào?",
    options: [
      "Khóa bí mật của nhóm thợ đào",
      "Toàn bộ các giao dịch (transactions) nằm trong block",
      "Ngưỡng Target hiện tại của mạng lưới",
      "Tên gọi định danh của chuỗi khối"
    ],
    correctIndex: 1, // B
  },
  // 13. [Dễ]
  {
    id: 13,
    difficulty: "easy",
    question: "Trường Timestamp trong Block Header có vai trò gì?",
    options: [
      "Tạo khóa riêng cho các ví người nhận",
      "Thay thế trường Nonce trong quá trình đào",
      "Ghi nhận thông tin thời điểm tạo ra block",
      "Xóa các giao dịch đã hết hạn"
    ],
    correctIndex: 2, // C
  },
  // 14. [Dễ]
  {
    id: 14,
    difficulty: "easy",
    question: "Cơ chế Proof of Work của mạng Bitcoin sử dụng thuật toán hàm băm nổi bật nào?",
    options: [
      "MD5",
      "SHA-1",
      "SHA-128",
      "SHA-256 (băm kép double-SHA-256)"
    ],
    correctIndex: 3, // D
  },
  // 15. [Dễ]
  {
    id: 15,
    difficulty: "easy",
    question: "Khi thợ đào thay đổi giá trị Nonce, mục đích trực tiếp nhất là gì?",
    options: [
      "Tạo ra một giá trị hash đầu ra mới để tiếp tục thử nghiệm so với Target",
      "Thay đổi nội dung số tiền trong giao dịch của người dùng",
      "Thay đổi mã băm của khối đứng trước",
      "Xóa bỏ hoàn toàn cây Merkle của khối"
    ],
    correctIndex: 0, // A
  },
  // 16. [Dễ]
  {
    id: 16,
    difficulty: "easy",
    question: "Vì sao thợ đào bắt buộc phải thử nhiều giá trị Nonce khác nhau?",
    options: [
      "Vì giá trị Nonce bắt buộc phải trùng khớp với Timestamp",
      "Vì không thể đoán biết trước Nonce nào sẽ tạo ra hash thỏa mãn Target",
      "Vì mỗi giao dịch trong khối yêu cầu một Nonce riêng biệt",
      "Vì Merkle Root thay đổi liên tục theo từng giây"
    ],
    correctIndex: 1, // B
  },
  // 17. [Dễ]
  {
    id: 17,
    difficulty: "easy",
    question: "Nếu kết quả băm mà thợ đào tính ra lớn hơn ngưỡng Target thì kết quả này có ý nghĩa gì?",
    options: [
      "Đã chắc chắn tìm được một block hợp lệ",
      "Target của mạng sẽ tự động tăng lên để nhận block",
      "Kết quả chưa đáp ứng điều kiện PoW và thợ đào phải tiếp tục thử Nonce khác",
      "Merkle Root của block lập tức bị vô hiệu hóa"
    ],
    correctIndex: 2, // C
  },
  // 18. [Dễ]
  {
    id: 18,
    difficulty: "easy",
    question: "Nếu ngưỡng Target bị giảm từ T xuống T/2 thì điều gì có xu hướng xảy ra?",
    options: [
      "Bài toán khai thác trở nên dễ hơn gấp đôi",
      "Xác suất mỗi lần thử thành công không bị ảnh hưởng",
      "Thợ đào không cần phải thay đổi Nonce nữa",
      "Bài toán khai thác khó hơn gấp đôi vì không gian hash hợp lệ bị giảm một nửa"
    ],
    correctIndex: 3, // D
  },
  // 19. [Dễ]
  {
    id: 19,
    difficulty: "easy",
    question: "Tại sao mạng Bitcoin cần cơ chế tự động điều chỉnh độ khó (Difficulty)?",
    options: [
      "Để duy trì thời gian tạo block trung bình ổn định quanh 10 phút khi tổng hashrate thay đổi",
      "Để thay đổi số lượng giao dịch tối đa trong mỗi block",
      "Để chuyển đổi thuật toán từ SHA-256 sang SHA-1",
      "Để xóa bớt các khối cũ trong lịch sử"
    ],
    correctIndex: 0, // A
  },
  // 20. [Dễ]
  {
    id: 20,
    difficulty: "easy",
    question: "Nếu tổng sức mạnh khai thác (hashrate) toàn mạng tăng mạnh nhưng độ khó không đổi, điều gì sẽ xảy ra?",
    options: [
      "Các block sẽ không bao giờ được tạo ra nữa",
      "Hàm băm SHA-256 sẽ ngừng hoạt động",
      "Cây Merkle trong mọi block sẽ biến mất",
      "Các block mới sẽ có xu hướng được tìm ra nhanh hơn nhiều so với mục tiêu 10 phút"
    ],
    correctIndex: 3, // D
  },

  // 21. [Vừa]
  {
    id: 21,
    difficulty: "medium",
    question: "Tại sao giao thức Bitcoin không cố định một giá trị Nonce duy nhất cho tất cả các thợ đào?",
    options: [
      "Vì Nonce chính là khóa bí mật của thợ đào",
      "Vì Nonce phải được đồng bộ với giờ nguyên tử quốc tế",
      "Vì thợ đào cần một không gian thử nghiệm để thay đổi đầu vào và tìm kiếm hash hợp lệ",
      "Vì Nonce phải có độ dài bằng chính xác Merkle Root"
    ],
    correctIndex: 2, // C
  },
  // 22. [Vừa]
  {
    id: 22,
    difficulty: "medium",
    question: "Trong cơ chế PoW, việc tìm kiếm nghiệm hash hợp lệ có đặc tính cốt lõi nào?",
    options: [
      "Khó kiểm tra nhưng lại cực kỳ dễ tìm",
      "Hoàn toàn không cần tốn công sức tính toán",
      "Mỗi khối luôn luôn chỉ tồn tại duy nhất một giá trị Nonce",
      "Rất khó để tìm ra (tốn nhiều phép thử) nhưng lại rất dễ và nhanh chóng để xác minh"
    ],
    correctIndex: 3, // D
  },
  // 23. [Vừa]
  {
    id: 23,
    difficulty: "medium",
    question: "Yếu tố nào làm cho cơ chế PoW tiêu tốn nhiều tài nguyên tính toán và năng lượng?",
    options: [
      "Thợ đào phải thực hiện hàng tỷ đến hàng nghìn tỷ phép thử hash ngẫu nhiên",
      "Thợ đào phải lưu trữ toàn bộ dữ liệu của toàn bộ mạng Internet",
      "Thợ đào phải mã hóa từng giao dịch bằng khóa RSA 4096-bit",
      "Thợ đào phải tải lại toàn bộ blockchain từ đầu sau mỗi lần thử Nonce"
    ],
    correctIndex: 0, // A
  },
  // 24. [Vừa]
  {
    id: 24,
    difficulty: "medium",
    question: "Khi một thợ đào tìm được Nonce hợp lệ và phát sóng block, các node khác kiểm tra block đó như thế nào?",
    options: [
      "Phải lặp lại toàn bộ quá trình thử các số Nonce trước đó từ 0",
      "Kiểm tra rất nhanh bằng cách thực hiện đúng 1 lần băm block header và so sánh với Target",
      "Không thể kiểm tra được mà chỉ đặt niềm tin vào thợ đào",
      "Bắt buộc phải xin chữ ký xác nhận của nhà sáng lập Bitcoin"
    ],
    correctIndex: 1, // B
  },
  // 25. [Vừa]
  {
    id: 25,
    difficulty: "medium",
    question: "Một block có Merkle Root hoàn toàn chính xác nhưng hash của Block Header không nhỏ hơn Target. Block này có đáp ứng PoW không?",
    options: [
      "Có đáp ứng vì Merkle Root đã chính xác",
      "Chỉ đáp ứng nếu dấu thời gian Timestamp hoàn toàn chính xác",
      "Hoàn toàn KHÔNG đáp ứng vì giá trị hash bắt buộc phải thỏa mãn điều kiện Target",
      "Chỉ đáp ứng nếu thợ đào đó thuộc về một mining pool lớn"
    ],
    correctIndex: 2, // C
  },
  // 26. [Vừa]
  {
    id: 26,
    difficulty: "medium",
    question: "Một block có hash đạt Target nhưng Merkle Root lại không khớp với danh sách giao dịch bên trong. Kết luận nào là đúng?",
    options: [
      "Block vẫn hợp lệ tuyệt đối vì PoW là điều kiện duy nhất",
      "Target sẽ tự động sửa để khớp với giao dịch",
      "Thợ đào đó được quyền lấy toàn bộ phần thưởng khối",
      "Block KHÔNG hợp lệ vì ngoài PoW thì dữ liệu giao dịch và cấu trúc Merkle cũng bắt buộc phải hợp lệ"
    ],
    correctIndex: 3, // D
  },
  // 27. [Vừa]
  {
    id: 27,
    difficulty: "medium",
    question: "Nếu ai đó sửa đổi một giao dịch trong block đã đào, Merkle Root thay đổi. Điều này ảnh hưởng gì đến PoW của block?",
    options: [
      "Mã hash của Block Header thay đổi hoàn toàn và PoW cũ gần như chắc chắn không còn hợp lệ",
      "PoW cũ vẫn hoàn toàn hợp lệ không bị ảnh hưởng gì",
      "Chỉ có trường Timestamp bị xóa bỏ",
      "Target của mạng sẽ tự động mở rộng để chấp nhận block mới"
    ],
    correctIndex: 0, // A
  },
  // 28. [Vừa]
  {
    id: 28,
    difficulty: "medium",
    question: "Tại sao cơ chế Proof of Work lại làm cho việc sửa đổi dữ liệu lịch sử blockchain trở nên cực kỳ tốn kém?",
    options: [
      "Vì toàn bộ giao dịch bị mã hóa vĩnh viễn không thể đọc được",
      "Vì sửa dữ liệu làm đổi hash, buộc kẻ gian phải tính toán lại PoW cho khối đó và toàn bộ các khối phía sau",
      "Vì thợ đào không có khả năng tính toán hàm băm SHA-256",
      "Vì các khối trong quá khứ không lưu mã băm"
    ],
    correctIndex: 1, // B
  },
  // 29. [Vừa]
  {
    id: 29,
    difficulty: "medium",
    question: "Trong Block Header, nếu trường Previous Block Hash bị thay đổi thì điều gì xảy ra?",
    options: [
      "Các giao dịch trong block tự động trở nên giống nhau",
      "Trường Nonce tự động bị hủy bỏ",
      "Liên kết mật mã với khối trước đó bị phá vỡ và block header hash thay đổi",
      "Merkle Root của khối tự động chuyển về 0"
    ],
    correctIndex: 2, // C
  },
  // 30. [Vừa]
  {
    id: 30,
    difficulty: "medium",
    question: "Nếu tổng hashrate toàn mạng tăng lên gấp đôi, để duy trì thời gian tạo block 10 phút, giao thức Bitcoin sẽ làm gì?",
    options: [
      "Tắt bớt một nửa số lượng máy đào trên thế giới",
      "Giảm số lượng giao dịch tối đa trong block về 0",
      "Xóa bỏ thuật toán SHA-256",
      "Tăng Difficulty (giảm Target) tại đợt điều chỉnh độ khó tiếp theo"
    ],
    correctIndex: 3, // D
  },
  // 31. [Vừa]
  {
    id: 31,
    difficulty: "medium",
    question: "Nhược điểm lớn nhất và thường bị chỉ trích nhiều nhất của cơ chế Proof of Work là gì?",
    options: [
      "Tiêu tốn lượng lớn năng lượng điện và tài nguyên phần cứng tính toán",
      "Hoàn toàn không sử dụng hàm băm mật mã",
      "Không thể xác minh tính hợp lệ của khối",
      "Không hỗ trợ việc chuyển tiền ngang hàng P2P"
    ],
    correctIndex: 0, // A
  },
  // 32. [Vừa]
  {
    id: 32,
    difficulty: "medium",
    question: "Điều gì xảy ra với xác suất thành công của một lần thử Nonce ngẫu nhiên nếu ngưỡng Target bị giảm xuống?",
    options: [
      "Xác suất thành công của mỗi lần thử sẽ tăng lên",
      "Xác suất thành công của mỗi lần thử sẽ giảm xuống",
      "Xác suất luôn bằng 100% trong mọi trường hợp",
      "Xác suất không thay đổi vì Target không liên quan đến xác suất"
    ],
    correctIndex: 1, // B
  },
  // 33. [Vừa]
  {
    id: 33,
    difficulty: "medium",
    question: "Một thợ đào có tốc độ hashrate cao hơn hẳn các thợ đào khác. Trong điều kiện mọi yếu tố khác tương đương, điều gì là đúng?",
    options: [
      "Thợ đào đó chắc chắn sẽ giành chiến thắng ở 100% các block tiếp theo",
      "Thợ đào đó không cần phải so sánh kết quả với Target",
      "Thợ đào đó có số lượng phép thử nhiều hơn trong cùng khoảng thời gian, nâng cao tỷ lệ tìm thấy nghiệm",
      "Thợ đào đó không cần phải đưa giao dịch vào block"
    ],
    correctIndex: 2, // C
  },
  // 34. [Vừa]
  {
    id: 34,
    difficulty: "medium",
    question: "Giả sử xác suất một lần thử đạt Target là p. Nếu thợ đào thực hiện n lần thử độc lập, xác suất thất bại trong cả n lần thử là gì?",
    options: [
      "p^n",
      "n / p",
      "1 - p^n",
      "(1 - p)^n"
    ],
    correctIndex: 3, // D
  },
  // 35. [Vừa]
  {
    id: 35,
    difficulty: "medium",
    question: "Nếu Target giảm đi một nửa trong mô hình phân bố hash đều, xác suất một lần thử thỏa mãn điều kiện sẽ có xu hướng thế nào?",
    options: [
      "Giảm đi khoảng một nửa",
      "Tăng lên gấp đôi",
      "Giữ nguyên không thay đổi",
      "Giảm về 0 tuyệt đối ngay lập tức"
    ],
    correctIndex: 0, // A
  },
  // 36. [Vừa]
  {
    id: 36,
    difficulty: "medium",
    question: "Vì sao việc thợ đào nâng cấp hashrate cao hơn không đảm bảo 100% chắc chắn sẽ đào được block tiếp theo?",
    options: [
      "Vì trường Nonce của họ luôn luôn bị sai",
      "Vì PoW có bản chất xác suất kiểu phép thử Bernoulli; hashrate chỉ tăng kỳ vọng chứ không bảo đảm kết quả",
      "Vì ngưỡng Target không tồn tại trên thực tế",
      "Vì thợ đào có địa chỉ ví nhỏ hơn luôn luôn được ưu tiên thắng"
    ],
    correctIndex: 1, // B
  },
  // 37. [Vừa]
  {
    id: 37,
    difficulty: "medium",
    question: "Một thợ đào đã tìm được Nonce hợp lệ nhưng sau đó thêm bớt một giao dịch trong block. Vì sao phải thực hiện PoW lại từ đầu?",
    options: [
      "Vì dấu thời gian Timestamp sẽ tự động bị sai lệch",
      "Vì thuật toán SHA-256 bị chuyển sang thuật toán khác",
      "Vì thay đổi giao dịch làm thay đổi Merkle Root, khiến giá trị hash của Block Header thay đổi và Nonce cũ mất hiệu lực",
      "Vì giá trị Nonce bị chuyển đổi thành Private Key"
    ],
    correctIndex: 2, // C
  },
  // 38. [Vừa]
  {
    id: 38,
    difficulty: "medium",
    question: "Một kẻ tấn công muốn sửa đổi một block trong quá khứ nhưng muốn giữ nguyên các block sau đó. Vấn đề lớn nhất là gì?",
    options: [
      "Chỉ cần đổi tên thợ đào là các block sau tự động chấp nhận",
      "Chỉ cần cập nhật Timestamp của block đó",
      "Không gặp vấn đề gì vì các block hoàn toàn độc lập với nhau",
      "Previous Block Hash của các block sau sẽ không còn khớp, buộc kẻ tấn công phải đào lại toàn bộ các block tiếp nối"
    ],
    correctIndex: 3, // D
  },
  // 39. [Vừa]
  {
    id: 39,
    difficulty: "medium",
    question: "Tại sao việc kiểm tra một Nonce hợp lệ lại nhanh hơn việc tìm ra Nonce đó hàng tỷ lần?",
    options: [
      "Xác minh chỉ cần tính hash đúng 1 lần rồi so với Target, còn tìm kiếm đòi hỏi hàng triệu đến hàng tỷ phép thử ngẫu nhiên",
      "Vì giá trị Nonce luôn được công bố trước trong mã nguồn",
      "Vì hàm băm SHA-256 có thể giải ngược trực tiếp",
      "Vì ngưỡng Target luôn có giá trị bằng 0"
    ],
    correctIndex: 0, // A
  },
  // 40. [Vừa]
  {
    id: 40,
    difficulty: "medium",
    question: "Nếu hai thợ đào cùng cạnh tranh đào một block với danh sách giao dịch giống nhau nhưng thử các khoảng Nonce khác nhau, điều gì xảy ra?",
    options: [
      "Cả hai luôn luôn nhận được các giá trị hash hoàn toàn giống nhau",
      "Mỗi thợ đào tạo ra các giá trị hash khác nhau và thợ đào nào gặp hash nhỏ hơn Target trước sẽ giành quyền đóng block",
      "Trường Nonce hoàn toàn không ảnh hưởng gì đến giá trị băm",
      "Chỉ thợ đào có Timestamp nhỏ hơn mới được mạng ghi nhận"
    ],
    correctIndex: 1, // B
  },

  // 41. [Khó]
  {
    id: 41,
    difficulty: "hard",
    question: "Nếu Difficulty tăng lên nhưng tổng hashrate toàn mạng không đổi, thời gian kỳ vọng để tìm thấy một block mới sẽ có xu hướng thế nào?",
    options: [
      "Giảm xuống",
      "Luôn luôn bằng 0",
      "Tăng lên (thời gian tạo block lâu hơn)",
      "Không thể xác định vì không liên quan"
    ],
    correctIndex: 2, // C
  },
  // 42. [Khó]
  {
    id: 42,
    difficulty: "hard",
    question: "Tại sao cơ chế điều chỉnh độ khó của Bitcoin bắt buộc phải dựa trên thời gian tạo block thực tế của 2016 block trước đó?",
    options: [
      "Để thay đổi kích thước danh sách giao dịch",
      "Để đổi tên gọi của các mining pool",
      "Để phân phối lại tiền thưởng cho các node nghèo",
      "Để so sánh với thời gian chuẩn 2 tuần, từ đó điều chỉnh độ khó tương ứng nhằm duy trì nhịp 10 phút/block"
    ],
    correctIndex: 3, // D
  },
  // 43. [Khó]
  {
    id: 43,
    difficulty: "hard",
    question: "Nếu một nửa số thợ đào trên thế giới đột ngột tắt máy (hashrate giảm 50%) trong khi chưa tới kỳ điều chỉnh độ khó, điều gì xảy ra?",
    options: [
      "Thời gian tạo mỗi block sẽ bị chậm lại đáng kể (có thể mất khoảng 20 phút mỗi block)",
      "Các block sẽ được tạo ra nhanh hơn gấp đôi",
      "Ngưỡng Target sẽ tự động mở rộng ngay lập tức sau 1 giây",
      "Mạng blockchain sẽ ngừng hoạt động vĩnh viễn"
    ],
    correctIndex: 0, // A
  },
  // 44. [Khó]
  {
    id: 44,
    difficulty: "hard",
    question: "Phát biểu nào sau đây mô tả đúng nhất mối quan hệ giữa Target và Difficulty trong Proof of Work?",
    options: [
      "Target càng thấp thì điều kiện bài toán càng dễ",
      "Target và Difficulty tỉ lệ nghịch: Difficulty càng cao thì Target càng nhỏ (vùng hash chấp nhận càng hẹp)",
      "Target và Difficulty là hai đại lượng hoàn toàn độc lập không liên quan",
      "Target chính là tên gọi khác của trường Nonce"
    ],
    correctIndex: 1, // B
  },
  // 45. [Khó]
  {
    id: 45,
    difficulty: "hard",
    question: "Một block có Timestamp hợp lệ, Previous Block Hash chính xác, Merkle Root đúng, nhưng hash của header không nhỏ hơn Target. Kết luận nào đúng?",
    options: [
      "Block vẫn hợp lệ vì 3/4 điều kiện đã đúng",
      "Các node sẽ tự động sửa hash cho thợ đào",
      "Block KHÔNG hợp lệ vì điều kiện PoW là bắt buộc, không thành phần nào có thể thay thế được",
      "Block được đưa vào danh sách chờ xác nhận"
    ],
    correctIndex: 2, // C
  },
  // 46. [Khó]
  {
    id: 46,
    difficulty: "hard",
    question: "Về mặt trực quan toán học, việc tăng Difficulty trong cơ chế PoW có thể được hiểu là gì?",
    options: [
      "Mở rộng tập hợp các giá trị hash được chấp nhận",
      "Cho phép mọi giá trị băm đều trở thành nghiệm hợp lệ",
      "Xóa bỏ hoàn toàn không gian giá trị băm",
      "Thu hẹp tập hợp các giá trị hash hợp lệ (buộc hash phải có giá trị số nhỏ hơn)"
    ],
    correctIndex: 3, // D
  },
  // 47. [Khó]
  {
    id: 47,
    difficulty: "hard",
    question: "Một người khẳng định: 'Miner A có hashrate gấp đôi Miner B thì Miner A chắc chắn 100% sẽ đào được block tiếp theo trước Miner B.' Khẳng định này đúng hay sai?",
    options: [
      "SAI, vì khai thác PoW mang tính xác suất ngẫu nhiên; hashrate cao chỉ làm tăng xác suất tìm thấy chứ không đảm bảo tuyệt đối",
      "ĐÚNG, vì ai có tốc độ cao hơn luôn luôn về đích trước",
      "ĐÚNG, vì thuật toán ưu tiên cho thợ đào có máy tính mạnh hơn",
      "SAI, vì hashrate hoàn toàn không ảnh hưởng đến việc tìm nghiệm PoW"
    ],
    correctIndex: 0, // A
  },
  // 48. [Khó]
  {
    id: 48,
    difficulty: "hard",
    question: "Nếu thợ đào thay đổi Merkle Root của block nhưng giữ nguyên giá trị Nonce cũ thì điều gì xảy ra với PoW?",
    options: [
      "Mã hash của block chắc chắn giữ nguyên",
      "Giá trị hash của Block Header thay đổi hoàn toàn và Nonce cũ gần như chắc chắn không còn tạo ra hash đạt Target",
      "Target của mạng sẽ tự động hạ thấp xuống",
      "Previous Block Hash của khối trước đó tự động thay đổi theo"
    ],
    correctIndex: 1, // B
  },
  // 49. [Khó]
  {
    id: 49,
    difficulty: "hard",
    question: "Tại sao cơ chế PoW kết hợp với liên kết chuỗi mật mã lại ngăn chặn hiệu quả cuộc tấn công làm giả lịch sử giao dịch?",
    options: [
      "Vì người dùng không bao giờ kiểm tra lại lịch sử khối",
      "Vì các thợ đào đều ký cam kết đạo đức không sửa dữ liệu",
      "Vì kẻ tấn công phải vượt qua tổng năng lượng tính toán của toàn bộ mạng lưới để viết lại lịch sử chuỗi dài nhất",
      "Vì các giao dịch trong blockchain không bao giờ có thể bị đảo ngược dù chỉ 1 bit"
    ],
    correctIndex: 2, // C
  },
  // 50. [Khó]
  {
    id: 50,
    difficulty: "hard",
    question: "Một thợ đào tìm được giá trị hash thỏa mãn Target nhưng bên trong block lại chứa một giao dịch chi tiêu kép (double-spend) không hợp lệ. Điều gì xảy ra?",
    options: [
      "Block vẫn được mạng chấp nhận vì đã tốn công đào PoW",
      "Các node khác sẽ tự động sửa giao dịch sai đó thành giao dịch đúng",
      "Mạng lưới sẽ lập tức phong tỏa ví của thợ đào đó",
      "Block bị toàn bộ mạng lưới TỪ CHỐI vì PoW chỉ là một điều kiện cần, block còn phải thỏa mãn tất cả quy tắc giao dịch"
    ],
    correctIndex: 3, // D
  },
  // 51. [Khó]
  {
    id: 51,
    difficulty: "hard",
    question: "Trong một mô hình PoW đơn giản, nếu một thợ đào tăng số lần thử hash từ n lần lên 2n lần trong cùng một khoảng thời gian, yếu tố nào tăng lên?",
    options: [
      "Xác suất kỳ vọng tìm thấy ít nhất một mã hash thỏa mãn Target tăng lên",
      "Ngưỡng Target của mạng tự động tăng lên gấp đôi",
      "Độ khó Difficulty của mạng tự động giảm đi một nửa",
      "Số bit đầu ra của hàm băm SHA-256 tăng lên"
    ],
    correctIndex: 0, // A
  },
  // 52. [Khó]
  {
    id: 52,
    difficulty: "hard",
    question: "Nếu mạng Bitcoin nhận thấy thời gian tạo block trung bình trong 2016 block vừa qua chỉ là 8 phút (nhanh hơn 10 phút), mạng sẽ điều chỉnh như thế nào?",
    options: [
      "Giảm độ khó Difficulty để block ra nhanh hơn nữa",
      "Tăng độ khó Difficulty (hạ Target xuống) để làm cho việc tìm hash khó hơn, kéo thời gian trung bình về 10 phút",
      "Xóa bỏ hoàn toàn trường Nonce",
      "Loại bỏ các giao dịch khỏi cây Merkle"
    ],
    correctIndex: 1, // B
  },
  // 53. [Khó]
  {
    id: 53,
    difficulty: "hard",
    question: "Đặc tính bất đối xứng nào sau đây phân biệt rõ nhất giữa 'Tìm nghiệm PoW' và 'Xác minh nghiệm PoW'?",
    options: [
      "Cả hai công việc đều cần thực hiện số lượng phép tính hoàn toàn bằng nhau",
      "Xác minh nghiệm khó hơn tìm nghiệm hàng triệu lần",
      "Tìm nghiệm là bài toán xác suất cần hàng tỷ phép thử ngẫu nhiên; xác minh nghiệm chỉ cần đúng 1 phép băm và so sánh",
      "Tìm nghiệm không cần sử dụng hàm băm, còn xác minh thì có"
    ],
    correctIndex: 2, // C
  }
];
