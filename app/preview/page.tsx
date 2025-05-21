import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function PreviewPage() {
  return (
    <div className="min-h-screen p-8 space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Color Palette</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="p-4">
            <div className="h-20 rounded bg-background mb-2"></div>
            <p className="text-sm">Background</p>
          </Card>
          <Card className="p-4">
            <div className="h-20 rounded bg-primary mb-2"></div>
            <p className="text-sm">Primary</p>
          </Card>
          <Card className="p-4">
            <div className="h-20 rounded bg-secondary mb-2"></div>
            <p className="text-sm">Secondary</p>
          </Card>
          <Card className="p-4">
            <div className="h-20 rounded bg-accent mb-2"></div>
            <p className="text-sm">Accent</p>
          </Card>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Gradients</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="p-4">
            <div className="h-32 rounded" style={{ background: "linear-gradient(135deg, hsl(240 70% 10%) 0%, hsl(260 70% 15%) 100%)" }}></div>
            <p className="text-sm mt-2">Background Gradient</p>
          </Card>
          <Card className="p-4">
            <div className="h-32 rounded gradient-border"></div>
            <p className="text-sm mt-2">Border Gradient</p>
          </Card>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">UI Components</h2>
        <div className="grid gap-4">
          <Card className="p-6 space-y-4">
            <h3 className="text-xl font-semibold">Buttons</h3>
            <div className="flex flex-wrap gap-4">
              <Button>Default Button</Button>
              <Button variant="secondary">Secondary Button</Button>
              <Button variant="outline">Outline Button</Button>
              <Button variant="ghost">Ghost Button</Button>
              <Button className="glow-effect">Glow Effect</Button>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">Table Example</h3>
            <table className="modern-table">
              <thead>
                <tr>
                  <th>Header 1</th>
                  <th>Header 2</th>
                  <th>Header 3</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Row 1, Cell 1</td>
                  <td>Row 1, Cell 2</td>
                  <td>Row 1, Cell 3</td>
                </tr>
                <tr>
                  <td>Row 2, Cell 1</td>
                  <td>Row 2, Cell 2</td>
                  <td>Row 2, Cell 3</td>
                </tr>
              </tbody>
            </table>
          </Card>

          <Card className="p-6 space-y-4">
            <h3 className="text-xl font-semibold">Status Badges</h3>
            <div className="flex gap-4">
              <span className="status-badge status-paid">Paid</span>
              <span className="status-badge status-pending">Pending</span>
              <span className="status-badge status-failed">Failed</span>
            </div>
          </Card>

          <Card className="p-6 space-y-4">
            <h3 className="text-xl font-semibold">Progress Bars</h3>
            <div className="space-y-4">
              <div className="progress-bar progress-bar-blue"></div>
              <div className="progress-bar progress-bar-cyan"></div>
              <div className="progress-bar gradient-bar"></div>
            </div>
          </Card>
        </div>
      </section>
    </div>
  )
} 