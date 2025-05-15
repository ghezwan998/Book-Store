
const Contact = () => {
  return (
    <div className="max-w-2xl mx-auto px-4 py-10 space-y-6">
      <h1 className="text-3xl font-bold">📞 Contact Us</h1>
      <p className="text-gray-700">
        We'd love to hear from you! Reach out to us through any of the following
        ways:
      </p>

      <div className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold">📍 Address</h2>
          <p className="text-gray-700">
            123 Book Street, Knowledge City, 45678, Country
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold">📧 Email</h2>
          <p className="text-gray-700">
            <a
              href="mailto:support@readmorebookstore.com"
              className="text-blue-600 underline"
            >
              book-store@gmail.com
            </a>
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold">📱 Phone</h2>
          <p className="text-gray-700">+1 (xxx) xxx-xxxx</p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
