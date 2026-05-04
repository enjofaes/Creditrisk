export const PLOT_CAPTURE_SETUP = `
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import io, base64, json

def _capture_figures():
    figs = []
    for fig_num in plt.get_fignums():
        fig = plt.figure(fig_num)
        buf = io.BytesIO()
        fig.savefig(buf, format='png', dpi=150, bbox_inches='tight')
        buf.seek(0)
        figs.append(base64.b64encode(buf.read()).decode('utf-8'))
    plt.close('all')
    return json.dumps(figs)
`;
