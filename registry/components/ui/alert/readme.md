# Alert

A flexible, accessible alert component built as a compound component. Supports four severity levels and three visual variants. Sub-components let you compose the layout yourself — icon, title, description, and a dismiss button are all separate pieces.

## Import

```tsx
import Alert, {
  AlertIcon,
  AlertTitle,
  AlertDescription,
  AlertAction,
} from "@/components/ui/alert/Alert";
```

## Basic Usage

```tsx
<Alert severity="success" variant="subtle">
  <AlertIcon />
  <AlertTitle>Payment successful</AlertTitle>
  <AlertAction onClose={() => {}} />
</Alert>
```

## With Description

```tsx
<Alert severity="info" variant="subtle">
  <AlertIcon />
  <div>
    <AlertTitle>New update available</AlertTitle>
    <AlertDescription>Version 2.1 is ready for installation.</AlertDescription>
  </div>
  <AlertAction onClose={() => handleClose()} />
</Alert>
```

## All Variants

```tsx
<Alert severity="warning" variant="subtle">
  <AlertIcon />
  <AlertTitle>Storage limit reached</AlertTitle>
</Alert>

<Alert severity="error" variant="solid">
  <AlertIcon />
  <AlertTitle>Something went wrong</AlertTitle>
</Alert>

<Alert severity="success" variant="outline">
  <AlertIcon />
  <AlertTitle>Backup completed</AlertTitle>
</Alert>
```

## Props

## Alert

| Prop        | Type                                          | Default     | Description                                                  |
| ----------- | --------------------------------------------- | ----------- | ------------------------------------------------------------ |
| `children`  | `ReactNode`                                   | Required    | The sub-components to render inside the alert.               |
| `severity`  | `"success" \| "info" \| "warning" \| "error"` | `"warning"` | Controls the icon, color, and semantic meaning of the alert. |
| `variant`   | `"subtle" \| "solid" \| "outline"`            | `"subtle"`  | Controls the visual style of the alert container.            |
| `className` | `string`                                      | `undefined` | Adds custom classes to the alert wrapper.                    |

`Alert` also accepts all standard `div` props.

## AlertIcon

| Prop        | Type            | Default     | Description                                                               |
| ----------- | --------------- | ----------- | ------------------------------------------------------------------------- |
| `icon`      | `ComponentType` | `undefined` | Optional custom icon. Falls back to the severity default if not provided. |
| `className` | `string`        | `undefined` | Adds custom classes to the icon wrapper.                                  |

## AlertTitle

| Prop        | Type        | Default     | Description                               |
| ----------- | ----------- | ----------- | ----------------------------------------- |
| `children`  | `ReactNode` | Required    | The title text to display.                |
| `className` | `string`    | `undefined` | Adds custom classes to the title element. |

`AlertTitle` also accepts all standard `div` props.

## AlertDescription

| Prop        | Type        | Default     | Description                                     |
| ----------- | ----------- | ----------- | ----------------------------------------------- |
| `children`  | `ReactNode` | Required    | The description text to display.                |
| `className` | `string`    | `undefined` | Adds custom classes to the description element. |

`AlertDescription` also accepts all standard `div` props.

## AlertAction

| Prop        | Type         | Default     | Description                                                                                     |
| ----------- | ------------ | ----------- | ----------------------------------------------------------------------------------------------- |
| `onClose`   | `() => void` | `undefined` | Callback fired when the dismiss button is clicked. If not provided, the button is not rendered. |
| `className` | `string`     | `undefined` | Adds custom classes to the close button.                                                        |

`AlertAction` also accepts all standard `button` props.

## Severity vs Variant

Use `severity` to set the meaning of the alert and `variant` to control how strongly it presents itself.

| Severity  | Icon            | Token             |
| --------- | --------------- | ----------------- |
| `success` | `CheckCircle2`  | `--color-success` |
| `info`    | `Info`          | `--color-info`    |
| `warning` | `AlertTriangle` | `--color-warning` |
| `error`   | `XCircle`       | `--color-danger`  |

| Variant   | Description                                                       |
| --------- | ----------------------------------------------------------------- |
| `subtle`  | Soft background, low visual weight. Good for dashboards.          |
| `solid`   | Filled background, high visibility. Good for critical messages.   |
| `outline` | Transparent background with colored border. Good for minimal UIs. |

## Styling

The component uses semantic design tokens from `globals.css`, such as:

- `--color-success`, `--color-success-subtle`, `--color-success-strong`
- `--color-info`, `--color-info-subtle`, `--color-info-strong`
- `--color-warning`, `--color-warning-subtle`, `--color-warning-strong`
- `--color-danger`, `--color-danger-subtle`, `--color-danger-strong`
- `--color-fg-inverse`
- `focus-ring-visible`

You can override any part by passing `className` to the relevant sub-component.

```tsx
<Alert severity="success" variant="subtle" className="max-w-sm">
  <AlertIcon className="mt-0.5" />
  <div>
    <AlertTitle className="font-semibold">Done!</AlertTitle>
    <AlertDescription>Your changes have been saved.</AlertDescription>
  </div>
</Alert>
```

## Notes

- Sub-components (`AlertIcon`, `AlertTitle`, `AlertDescription`, `AlertAction`) must be rendered inside an `<Alert>` — they read severity and variant via React context and will throw if used outside.
- `AlertAction` renders nothing if `onClose` is not provided — it is safe to always include it.
- `AlertIcon` falls back to the severity's default icon if no `icon` prop is passed. On the `solid` variant, icon color is always forced to `text-fg-inverse` for contrast.
- `lucide-react` is required for the default severity icons (`CheckCircle2`, `Info`, `AlertTriangle`, `XCircle`, `X`).
- The alert container has `role="alert"` for screen reader support, and the close button has `aria-label="Close alert"`.
