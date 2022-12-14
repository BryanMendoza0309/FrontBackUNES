package android.arch.lifecycle;

import java.util.HashMap;
/* loaded from: classes.dex */
public class ViewModelStore {
    private final HashMap<String, ViewModel> mMap = new HashMap<>();

    public final void put(String str, ViewModel viewModel) {
        ViewModel viewModel2 = this.mMap.get(str);
        if (viewModel2 != null) {
            viewModel2.onCleared();
        }
        this.mMap.put(str, viewModel);
    }

    public final ViewModel get(String str) {
        return this.mMap.get(str);
    }

    public final void clear() {
        for (ViewModel viewModel : this.mMap.values()) {
            viewModel.onCleared();
        }
        this.mMap.clear();
    }
}
