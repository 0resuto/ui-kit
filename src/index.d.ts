import * as React from 'react';

// ============================================================================
// Core Actions & Buttons
// ============================================================================

export type ButtonVariant = 'primary' | 'glass' | 'minimal' | 'secondary' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg' | 'icon';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  disabled?: boolean;
  fullWidth?: boolean;
  children?: React.ReactNode;
  className?: string;
}

export declare const Button: React.ForwardRefExoticComponent<
  ButtonProps & React.RefAttributes<HTMLButtonElement>
> | ((props: ButtonProps) => React.ReactElement | null);

// ============================================================================
// Overlays & Feedback Components
// ============================================================================

export type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  description?: React.ReactNode;
  icon?: React.ElementType;
  size?: ModalSize;
  showClose?: boolean;
  closeOnBackdropClick?: boolean;
  closeOnEscape?: boolean;
  footer?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
}

export declare function Modal(props: ModalProps): React.ReactElement | null;

export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';

export interface TooltipProps {
  content: React.ReactNode;
  position?: TooltipPosition;
  delay?: number;
  className?: string;
  children: React.ReactNode;
}

export declare function Tooltip(props: TooltipProps): React.ReactElement | null;

// ============================================================================
// Toast Notification System
// ============================================================================

export type ToastType = 'success' | 'error' | 'warning' | 'info';
export type ToastPosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';

export interface ToastAction {
  label: string;
  onClick: () => void;
}

export interface ToastItemData {
  id: string;
  type?: ToastType;
  title?: string;
  message?: string;
  duration?: number;
  action?: ToastAction;
  [key: string]: unknown;
}

export interface ToastItemProps {
  toast: ToastItemData;
  onDismiss: (id: string) => void;
}

export declare function ToastItem(props: ToastItemProps): React.ReactElement | null;

export interface ToastContainerProps {
  toasts?: ToastItemData[];
  onDismiss: (id: string) => void;
  position?: ToastPosition;
}

export declare function ToastContainer(props: ToastContainerProps): React.ReactElement | null;

export interface ToastOptions {
  type?: ToastType;
  title?: string;
  message?: string;
  duration?: number;
  action?: ToastAction;
  [key: string]: unknown;
}

export interface ToastFunction {
  (message: string, options?: Omit<ToastOptions, 'message'>): string;
  success: (title: string, message?: string, options?: Omit<ToastOptions, 'type' | 'title' | 'message'>) => string;
  error: (title: string, message?: string, options?: Omit<ToastOptions, 'type' | 'title' | 'message'>) => string;
  warning: (title: string, message?: string, options?: Omit<ToastOptions, 'type' | 'title' | 'message'>) => string;
  info: (title: string, message?: string, options?: Omit<ToastOptions, 'type' | 'title' | 'message'>) => string;
  dismiss: (id: string) => void;
}

export interface ToastProviderProps {
  children: React.ReactNode;
  position?: ToastPosition;
}

export declare function ToastProvider(props: ToastProviderProps): React.ReactElement | null;
export declare function useToast(): ToastFunction;

// ============================================================================
// Form Inputs & Controls
// ============================================================================

export type ControlSize = 'sm' | 'md' | 'lg';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClear?: () => void;
  placeholder?: string;
  icon?: React.ElementType | null;
  showClear?: boolean;
  size?: ControlSize;
  disabled?: boolean;
  className?: string;
}

export declare function Input(props: InputProps): React.ReactElement | null;

export interface NumberStepperProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'onChange' | 'value'> {
  value?: number | string;
  onChange?: (value: number | string) => void;
  step?: number;
  min?: number;
  max?: number;
  unit?: string;
  size?: ControlSize;
  disabled?: boolean;
  className?: string;
}

export declare function NumberStepper(props: NumberStepperProps): React.ReactElement | null;

export interface SelectOption<T = any> {
  value: T;
  label: string;
}

export interface SelectGroup<T = any> {
  group?: string;
  label?: string;
  items?: Array<SelectOption<T> | string | number>;
  options?: Array<SelectOption<T> | string | number>;
}

export type SelectOptionItem<T = any> = SelectOption<T> | SelectGroup<T> | string | number;

export interface SelectProps<T = any> {
  value?: T;
  onChange?: (value: T) => void;
  options?: Array<SelectOptionItem<T>>;
  placeholder?: string;
  size?: ControlSize;
  disabled?: boolean;
  className?: string;
}

export declare function Select<T = any>(props: SelectProps<T>): React.ReactElement | null;


export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'checked'> {
  checked?: boolean;
  onChange?: (checked: boolean, event: React.ChangeEvent<HTMLInputElement>) => void;
  label?: React.ReactNode;
  description?: React.ReactNode;
  disabled?: boolean;
  className?: string;
}

export declare function Checkbox(props: CheckboxProps): React.ReactElement | null;

// ============================================================================
// Progress & Data Visualization
// ============================================================================

export type ProgressColor = 'brand-30' | 'accent-green' | 'accent-purple' | 'accent-red' | 'accent-yellow' | 'accent-blue' | string;
export type ProgressSize = 'sm' | 'md' | 'lg' | number;
export type ProgressOrientation = 'horizontal' | 'vertical';

export interface ProgressBarProps {
  value?: number;
  max?: number;
  color?: ProgressColor;
  size?: ProgressSize;
  glow?: boolean;
  pulse?: boolean;
  orientation?: ProgressOrientation;
  className?: string;
}

export declare function ProgressBar(props: ProgressBarProps): React.ReactElement | null;

export interface SliderProps {
  value?: number;
  onChange?: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  fill?: boolean;
  fillColor?: string;
  disabled?: boolean;
  className?: string;
}

export declare function Slider(props: SliderProps): React.ReactElement | null;

// ============================================================================
// Switches & Navigation
// ============================================================================

export interface PillOption<T = any> {
  value: T;
  label: string;
}

export interface SlidingPillProps<T = any> {
  options?: Array<PillOption<T> | string | number>;
  value: T;
  onChange?: (value: T) => void;
  disabled?: boolean;
  size?: 'sm' | 'md';
  width?: string;
  className?: string;
}

export declare function SlidingPill<T = any>(props: SlidingPillProps<T>): React.ReactElement | null;

export interface TabItem<T = string> {
  id: T;
  label: string;
  icon?: React.ElementType;
}

export interface SegmentedTabsProps<T = string> {
  tabs?: TabItem<T>[];
  activeTab: T;
  onChange?: (id: T) => void;
  className?: string;
}

export declare function SegmentedTabs<T = string>(props: SegmentedTabsProps<T>): React.ReactElement | null;

// ============================================================================
// Status & Badges
// ============================================================================

export type BadgeColor = 'brand' | 'green' | 'purple' | 'red' | 'yellow' | 'blue' | 'neutral';

export interface BadgeProps {
  color?: BadgeColor;
  active?: boolean;
  beacon?: boolean;
  children?: React.ReactNode;
  className?: string;
}

export declare function Badge(props: BadgeProps): React.ReactElement | null;

export type StatPillColor = 'brand' | 'green' | 'purple' | 'blue' | 'yellow' | 'red' | 'neutral';
export type StatPillSize = 'sm' | 'md';

export interface StatPillProps {
  icon?: React.ElementType;
  label?: string;
  value: string | number;
  unit?: string;
  progress?: number;
  color?: StatPillColor;
  beacon?: boolean;
  size?: StatPillSize;
  className?: string;
}

export declare function StatPill(props: StatPillProps): React.ReactElement | null;

// ============================================================================
// Sidebar & Layout Panels
// ============================================================================

export type CardVariant = 'glass' | 'card' | 'ghost';
export type CardPadding = 'none' | 'sm' | 'md' | 'lg';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  icon?: React.ElementType;
  actions?: React.ReactNode;
  variant?: CardVariant;
  padding?: CardPadding;
  footer?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
}

export declare function Card(props: CardProps): React.ReactElement | null;

export interface RailAction {
  icon?: React.ElementType;
  title?: string;
  onClick?: () => void;
  active?: boolean;
  divider?: boolean;
}

export interface RailProps {
  topActions?: RailAction[];
  bottomActions?: RailAction[];
  isDrawerOpen?: boolean;
  showShadow?: boolean;
  className?: string;
}

export declare function Rail(props: RailProps): React.ReactElement | null;

export interface DrawerProps {
  isOpen?: boolean;
  onClose?: () => void;
  title?: string;
  subtitle?: string;
  footerText?: string;
  children?: React.ReactNode;
  className?: string;
}

export declare function Drawer(props: DrawerProps): React.ReactElement | null;

export interface SidebarCardProps {
  title?: string;
  icon?: React.ElementType;
  badge?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

export declare function SidebarCard(props: SidebarCardProps): React.ReactElement | null;
