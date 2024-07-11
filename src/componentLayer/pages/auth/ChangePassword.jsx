import React, { useContext, useEffect, useState } from "react";
import login_bg from "../../../assets/Images/login_bg.jpg";
import logo from "../../../assets/Images/Kapil-Logo.png";
import { AuthContext } from "../../../contexts/authContext/authContext";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
function ChangePassword() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { resetPassword, authState, resetPasswordWhenLoggedIn } =
    useContext(AuthContext);
  const [showOldPassword, setShowOldPassword] = useState();
  const [showPassword, setShowPassword] = useState();
  const [showConfirmPassword, setShowConfirmPassword] = useState();
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [checkvalidations, setCheckValidations] = useState({
    specialChar: false,
    passwordLength: false,
    capitalLetter: false,
    lowerLetter: false,
    onNumber: false,
    confirmPassword: false,
  });
  useEffect(() => {
    console.log("authState", authState);
  });
  useEffect(() => {
    if (password.length >= 6) {
      setCheckValidations((prev) => ({ ...prev, passwordLength: true }));
    } else {
      setCheckValidations((prev) => ({ ...prev, passwordLength: false }));
    }
    if (/(?=.*[A-Z])/.test(password)) {
      setCheckValidations((prev) => ({ ...prev, capitalLetter: true }));
    } else {
      setCheckValidations((prev) => ({ ...prev, capitalLetter: false }));
    }
    if (/(?=.*[a-z])/.test(password)) {
      setCheckValidations((prev) => ({ ...prev, lowerLetter: true }));
    } else {
      setCheckValidations((prev) => ({ ...prev, lowerLetter: false }));
    }
    if (/(?=.*\d)/.test(password)) {
      setCheckValidations((prev) => ({ ...prev, oneNumber: true }));
    } else {
      setCheckValidations((prev) => ({ ...prev, oneNumber: false }));
    }
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      setCheckValidations((prev) => ({ ...prev, specialChar: true }));
    } else {
      setCheckValidations((prev) => ({ ...prev, specialChar: false }));
    }
  }, [password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password.length < 6) {
      toast.error("Password should be at least 6 characters long");
      return;
    }
    if (!/(?=.*[A-Z])/.test(password)) {
      toast.error("Password should contain at least one capital letter");
      return;
    }
    if (!/(?=.*[a-z])/.test(password)) {
      toast.error("Password should contain at least one lowercase letter");
      return;
    }

    if (!/(?=.*\d)/.test(password)) {
      toast.error("Password should contain at least one number");
      return;
    }

    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      toast.error("Password should contain at least one special character");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (password === confirmPassword) {
      if (!authState?.user?.id && !authState?.token) {
        const res = await resetPassword({
          id,
          password,
        });
        res === 200 && navigate("/login");
      }
      if (authState?.user?.id && authState?.token) {
        const res = await resetPasswordWhenLoggedIn({
          id: authState.user.id,
          oldpassword: oldPassword,
          newpassword: password,
        });
        res === 200 && navigate("/login");
      }
    } else {
      toast.error("Passwords did not match!");
    }
  };
  const handleCopy = (event) => {
    event.preventDefault();
  };
  return (
    <main className="relative overflow-hidden">
      <img
        src={login_bg}
        alt="background image"
        className="absolute w-screen h-screen"
      />
      <div className="relative flex justify-center h-screen items-center">
        <div className="w-96 rounded-lg overflow-hidden shadow-2xl ">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm pt-8">
            <img
              className="mx-auto h-16 w-auto"
              src={logo}
              alt="Company Logo"
            />
              <p className="text-xs text-center p-1 font-semibold mb-1"> Creating Value || Cultivating Trust</p>
              <hr className="p-1"/>
            <h2 className=" text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 ">
              Change Password
            </h2>
          </div>





          <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-sm px-8 pb-8">
            <form className="space-y-2" action="#" method="POST">
              {authState?.user?.id && authState?.token && (
                <div>
                  <label
                    htmlFor="passowrd"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Enter Old Password <span className="text-[#dc2626]">*</span>
                  </label>
                  <div className="mt-2 relative">
                    <input
                      id="passowrd"
                      name="passowrd"
                      onChange={(e) => setOldPassword(e.target.value)}
                      placeholder="Enter old password"
                      value={oldPassword}
                      type={showOldPassword ? "text" : "password"}
                      onCopy={handleCopy}
                      required
                      className="p-3 block w-full rounded-md border border-1 border-gray-400 py-1.5 text-gray-900 bg-gray-100  appearance-none shadow-sm  placeholder:text-gray-400 focus:outline-none focus:border-orange-400 sm:text-sm sm:leading-6"
                    />
                    <button
                      type="button"
                      onClick={() => setShowOldPassword(!showOldPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 focus:outline-none"
                    >
                      {showOldPassword ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 16 16"
                          fill="currentColor"
                          className="w-4 h-4"
                        >
                          <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
                          <path
                            fill-rule="evenodd"
                            d="M1.38 8.28a.87.87 0 0 1 0-.566 7.003 7.003 0 0 1 13.238.006.87.87 0 0 1 0 .566A7.003 7.003 0 0 1 1.379 8.28ZM11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                            clip-rule="evenodd"
                          />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 16 16"
                          fill="currentColor"
                          className="w-4 h-4"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M3.28 2.22a.75.75 0 0 0-1.06 1.06l10.5 10.5a.75.75 0 1 0 1.06-1.06l-1.322-1.323a7.012 7.012 0 0 0 2.16-3.11.87.87 0 0 0 0-.567A7.003 7.003 0 0 0 4.82 3.76l-1.54-1.54Zm3.196 3.195 1.135 1.136A1.502 1.502 0 0 1 9.45 8.389l1.136 1.135a3 3 0 0 0-4.109-4.109Z"
                            clip-rule="evenodd"
                          />
                          <path d="m7.812 10.994 1.816 1.816A7.003 7.003 0 0 1 1.38 8.28a.87.87 0 0 1 0-.566 6.985 6.985 0 0 1 1.113-2.039l2.513 2.513a3 3 0 0 0 2.806 2.806Z" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
              )}
              <div>
                <label
                  htmlFor="passowrd"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Enter New Password <span className="text-[#dc2626]">*</span>
                </label>
                <div className="mt-2 relative">
                  <input
                    id="passowrd"
                    name="passowrd"
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter new password"
                    value={password}
                    type={showPassword ? "text" : "password"}
                    onCopy={handleCopy}
                    required
                    className="p-3 block w-full rounded-md border border-1 border-gray-400 py-1.5 text-gray-900 bg-gray-100  appearance-none shadow-sm  placeholder:text-gray-400 focus:outline-none focus:border-orange-400 sm:text-sm sm:leading-6"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 focus:outline-none"
                  >
                    {showPassword ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="w-4 h-4"
                      >
                        <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
                        <path
                          fill-rule="evenodd"
                          d="M1.38 8.28a.87.87 0 0 1 0-.566 7.003 7.003 0 0 1 13.238.006.87.87 0 0 1 0 .566A7.003 7.003 0 0 1 1.379 8.28ZM11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="w-4 h-4"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M3.28 2.22a.75.75 0 0 0-1.06 1.06l10.5 10.5a.75.75 0 1 0 1.06-1.06l-1.322-1.323a7.012 7.012 0 0 0 2.16-3.11.87.87 0 0 0 0-.567A7.003 7.003 0 0 0 4.82 3.76l-1.54-1.54Zm3.196 3.195 1.135 1.136A1.502 1.502 0 0 1 9.45 8.389l1.136 1.135a3 3 0 0 0-4.109-4.109Z"
                          clip-rule="evenodd"
                        />
                        <path d="m7.812 10.994 1.816 1.816A7.003 7.003 0 0 1 1.38 8.28a.87.87 0 0 1 0-.566 6.985 6.985 0 0 1 1.113-2.039l2.513 2.513a3 3 0 0 0 2.806 2.806Z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Confirm New Password{" "}
                    <span className="text-[#dc2626]">*</span>
                  </label>
                </div>
                <div className="mt-2 relative">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm new password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    value={confirmPassword}
                    autoComplete="confirmPassword"
                    onCopy={handleCopy}
                    required
                    className="p-3 block w-full rounded-md border border-1 border-gray-400 py-1.5 text-gray-900 bg-gray-100  appearance-none shadow-sm  placeholder:text-gray-400 focus:outline-none focus:border-orange-400 sm:text-sm sm:leading-6"
                  />

                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-[30%] transform-translate-y-1/2 text-gray-500 focus:outline-none"
                  >
                    {showConfirmPassword ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="w-4 h-4"
                      >
                        <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
                        <path
                          fill-rule="evenodd"
                          d="M1.38 8.28a.87.87 0 0 1 0-.566 7.003 7.003 0 0 1 13.238.006.87.87 0 0 1 0 .566A7.003 7.003 0 0 1 1.379 8.28ZM11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="w-4 h-4"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M3.28 2.22a.75.75 0 0 0-1.06 1.06l10.5 10.5a.75.75 0 1 0 1.06-1.06l-1.322-1.323a7.012 7.012 0 0 0 2.16-3.11.87.87 0 0 0 0-.567A7.003 7.003 0 0 0 4.82 3.76l-1.54-1.54Zm3.196 3.195 1.135 1.136A1.502 1.502 0 0 1 9.45 8.389l1.136 1.135a3 3 0 0 0-4.109-4.109Z"
                          clip-rule="evenodd"
                        />
                        <path d="m7.812 10.994 1.816 1.816A7.003 7.003 0 0 1 1.38 8.28a.87.87 0 0 1 0-.566 6.985 6.985 0 0 1 1.113-2.039l2.513 2.513a3 3 0 0 0 2.806 2.806Z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <span className="text-sm text-gray-600 ">
                {" "}
                New password must contain:
                <span className="text-xs text-gray-500 flex ">
                  {checkvalidations.passwordLength ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      className="w-4 h-4 text-[#15803d]"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      className="w-4 h-4 text-[#dc2626] "
                    >
                      <path d="M5.28 4.22a.75.75 0 0 0-1.06 1.06L6.94 8l-2.72 2.72a.75.75 0 1 0 1.06 1.06L8 9.06l2.72 2.72a.75.75 0 1 0 1.06-1.06L9.06 8l2.72-2.72a.75.75 0 0 0-1.06-1.06L8 6.94 5.28 4.22Z" />
                    </svg>
                  )}{" "}
                  At least 6 characters
                </span>
                <span className="text-xs text-gray-500 flex">
                  {checkvalidations.capitalLetter ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      className="w-4 h-4 text-[#15803d]"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      className="w-4 h-4 text-[#dc2626] "
                    >
                      <path d="M5.28 4.22a.75.75 0 0 0-1.06 1.06L6.94 8l-2.72 2.72a.75.75 0 1 0 1.06 1.06L8 9.06l2.72 2.72a.75.75 0 1 0 1.06-1.06L9.06 8l2.72-2.72a.75.75 0 0 0-1.06-1.06L8 6.94 5.28 4.22Z" />
                    </svg>
                  )}
                  At least one uppercase character
                </span>
                <span className="text-xs text-gray-500 flex">
                  {checkvalidations.lowerLetter ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      className="w-4 h-4 text-[#15803d]"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      className="w-4 h-4 text-[#dc2626] "
                    >
                      <path d="M5.28 4.22a.75.75 0 0 0-1.06 1.06L6.94 8l-2.72 2.72a.75.75 0 1 0 1.06 1.06L8 9.06l2.72 2.72a.75.75 0 1 0 1.06-1.06L9.06 8l2.72-2.72a.75.75 0 0 0-1.06-1.06L8 6.94 5.28 4.22Z" />
                    </svg>
                  )}
                  At least one lowercase character
                </span>
                <span className="text-xs text-gray-500 flex">
                  {checkvalidations.oneNumber ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      className="w-4 h-4 text-[#15803d]"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      className="w-4 h-4 text-[#dc2626] "
                    >
                      <path d="M5.28 4.22a.75.75 0 0 0-1.06 1.06L6.94 8l-2.72 2.72a.75.75 0 1 0 1.06 1.06L8 9.06l2.72 2.72a.75.75 0 1 0 1.06-1.06L9.06 8l2.72-2.72a.75.75 0 0 0-1.06-1.06L8 6.94 5.28 4.22Z" />
                    </svg>
                  )}
                  At least one number character
                </span>
                <span className="text-xs text-gray-500 flex">
                  {checkvalidations.specialChar ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      className="w-4 h-4 text-[#15803d]"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      className="w-4 h-4 text-[#dc2626] "
                    >
                      <path d="M5.28 4.22a.75.75 0 0 0-1.06 1.06L6.94 8l-2.72 2.72a.75.75 0 1 0 1.06 1.06L8 9.06l2.72 2.72a.75.75 0 1 0 1.06-1.06L9.06 8l2.72-2.72a.75.75 0 0 0-1.06-1.06L8 6.94 5.28 4.22Z" />
                    </svg>
                  )}
                  At least one special character
                </span>
              </span>

              <div>
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="flex w-full justify-center rounded-md bg-orange-600 px-3 py-1.5 text-sm  leading-6 text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}

export default ChangePassword;
