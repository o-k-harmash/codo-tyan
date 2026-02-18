import { useUserStore } from "@/stores/userStore"
import { useEffect, useReducer, useRef, useState } from "react"
import { apiUpdateUser } from "@/services/api/user"
import useApiError from "@/hooks/useApiError"

interface SettingsState {
  userId: string
  email: string
  firstName: string
  lastName: string
  userName: string
  userAvatar: File | null
}

const SET_SETTINGS = (
  state: SettingsState,
  e: React.ChangeEvent<HTMLInputElement>,
) => {
  const { name, value } = e.target

  if (name === "userAvatar") {
    return { ...state, userAvatar: e.target.files?.[0] as File }
  }

  return { ...state, [name]: value }
}

export default function Settings() {
  const { user, setUser } = useUserStore()
  const formRef = useRef<HTMLFormElement>(null)

  const [settings, setSettings] = useReducer(SET_SETTINGS, {
    userId: user?.userId ?? "",
    email: user?.email ?? "",
    firstName: user?.firstName ?? "",
    lastName: user?.lastName ?? "",
    userName: user?.userName ?? "",
    userAvatar: null,
  })

  const [avatarBase64, setAvatarBase64] = useState(user?.avatarBase64)
  const [success, setSuccess] = useState(false)
  const { setError } = useApiError()
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    const file = settings.userAvatar
    if (!file) {
      setAvatarBase64(user?.avatarBase64)
      return
    }

    const reader = new FileReader()
    reader.onloadend = () => {
      const result = reader.result as string
      const base64 = result.split(",")[1]
      setAvatarBase64(base64)
    }
    reader.readAsDataURL(file)
  }, [user, settings.userAvatar])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const form = formRef.current
    if (!form) {
      return
    }

    if (form.checkValidity()) {
      const { userName, userAvatar, firstName, lastName, email } = settings
      try {
        const result = await apiUpdateUser(
          userName,
          email,
          firstName,
          lastName,
          userAvatar,
        )

        if (result.ok) {
          setUser(result.user)
          setSuccess(true)
        } else {
          setFormErrors(result.errors)
        }
      } catch (e) {
        setError(e)
      }

      return
    }

    const newErrors: Record<string, string> = {}

    Array.from(form.elements).forEach((el) => {
      const input = el as HTMLInputElement
      if (!input.name || !input.willValidate) {
        return
      }

      if (!input.validity.valid) {
        newErrors[input.name] = input.validationMessage
      }
    })

    setFormErrors(newErrors)
  }

  return (
    user && (
      <div className="profile">
        <h1>Profile Settings</h1>

        <form
          ref={formRef}
          className="profile__settings"
          noValidate
          onSubmit={handleSubmit}
        >
          <div>
            <label
              htmlFor="userId"
              className="block text-sm font-medium text-gray-700"
            >
              User ID
            </label>
            <input
              id="userId"
              name="userId"
              type="text"
              value={settings.userId}
              readOnly
              onChange={setSettings}
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              defaultValue={settings.email}
              onChange={setSettings}
              data-error={!!formErrors.email}
            />
            {formErrors.email && (
              <span className="profile__error">{formErrors.email}</span>
            )}
          </div>

          <fieldset className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700"
              >
                First Name
              </label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                required
                defaultValue={settings.firstName}
                onChange={setSettings}
                data-error={!!formErrors.firstName}
              />
              {formErrors.firstName && (
                <span className="profile__error">{formErrors.firstName}</span>
              )}
            </div>

            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-700"
              >
                Last Name
              </label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                required
                defaultValue={settings.lastName}
                onChange={setSettings}
                data-error={!!formErrors.lastName}
              />
              {formErrors.lastName && (
                <span className="profile__error">{formErrors.lastName}</span>
              )}
            </div>
          </fieldset>

          <div>
            <label
              htmlFor="userName"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              id="userName"
              name="userName"
              type="text"
              required
              defaultValue={settings.userName}
              onChange={setSettings}
              data-error={!!formErrors.userName}
            />
            {formErrors.userName && (
              <span className="profile__error">{formErrors.userName}</span>
            )}
          </div>

          <div>
            <label
              htmlFor="userAvatar"
              className="profile__avatar block text-sm font-medium
                text-gray-700"
            >
              Avatar
              <img
                src={`data:image/png;base64,${avatarBase64}`}
                alt="avatar"
                className="mt-2 h-20 w-20 rounded-full border border-gray-300
                  object-cover"
              />
            </label>
            <input
              id="userAvatar"
              name="userAvatar"
              className="profile__avatar-input"
              required={avatarBase64 ? false : true}
              type="file"
              onChange={setSettings}
            />
          </div>

          {success && (
            <span className="profile__success">User updated success.</span>
          )}

          <button type="submit" className="profile__submit btn btn--filled">
            Save changes
          </button>
        </form>
      </div>
    )
  )
}
