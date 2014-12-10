/*
 查找

 数据的组织和查找是大多数应用程序的核心，而查找是所有数据处理中最基本、最常用的操作。特别当查找的对象是一个庞大数量的数据集合中的元素时，查找的方法和效率就显得格外重要。

 本章主要讨论顺序表、有序表、树表和哈希表查找的各种实现方法，以及相应查找方法在等概率情况下的平均查找长度。

 查找的概念

 查找表(Search Table)：相同类型的数据元素(对象)组成的集合，每个元素通常由若干数据项构成。

 关键字(Key，码)：数据元素中某个(或几个)数据项的值，它可以标识一个数据元素。若关键字能唯一标识一个数据元素，则关键字称为主关键字；将能标识若干个数据元素的关键字称为次关键字。

 查找/检索(Searching)：根据给定的K值，在查找表中确定一个关键字等于给定值的记录或数据元素。
 ◆  查找表中存在满足条件的记录：查找成功；结果：所查到的记录信息或记录在查找表中的位置。
 ◆ 查找表中不存在满足条件的记录：查找失败。

 查找有两种基本形式：静态查找和动态查找。
 静态查找(Static Search)：在查找时只对数据元素进行查询或检索，查找表称为静态查找表。
 动态查找(Dynamic Search)：在实施查找的同时，插入查找表中不存在的记录，或从查找表中删除已存在的某个记录，查找表称为动态查找表。

 查找的对象是查找表，采用何种查找方法，首先取决于查找表的组织。查找表是记录的集合，而集合中的元素之间是一种完全松散的关系，因此，查找表是一种非常灵活的数据结构，可以用多种方式来存储。

 根据存储结构的不同，查找方法可分为三大类：
 ①  顺序表和链表的查找：将给定的K值与查找表中记录的关键字逐个进行比较， 找到要查找的记录；
 ②  散列表的查找：根据给定的K值直接访问查找表， 从而找到要查找的记录；
 ③  索引查找表的查找：首先根据索引确定待查找记录所在的块 ，然后再从块中找到要查找的记录。

 查找方法评价指标
 查找过程中主要操作是关键字的比较，查找过程中关键字的平均比较次数(平均查找长度ASL：Average Search Length)作为衡量一个查找算法效率高低的标准。

 */

/*
 静态查找

 线性表是查找表最简单的一种组织方式

 顺序查找(Sequential Search)
 1  查找思想
 从表的一端开始逐个将记录的关键字和给定K值进行比较，若某个记录的关键字和给定K值相等，查找成功；否则，若扫描完整个表，仍然没有找到相应的记录，则查找失败。

 2   算法分析
 不失一般性，设查找每个记录成功的概率相等，即Pi=1/n；查找第i个元素成功的比较次数Ci=n-i+1 ；
 ◆ 查找成功时的平均查找长度ASL：(n+1)/2
 ◆  包含查找不成功时：查找失败的比较次数为n+1，若成功与不成功的概率相等，对每个记录的查找概率为Pi=1/(2n)，则平均查找长度ASL：3(n+1)/4
 */

function sequentialSearch(sTable, key) {
    // 设置监视哨兵,失败返回-1
    sTable[-1] = key;
    for (var i = sTable.length - 1; sTable[i] !== key; --i);
    return i;
}

console.log('sequentialSearch: ');
console.log(sequentialSearch([1, 2, 3, 4, 5], 6));  // -1


/*
 折半查找(Binary Search)

 折半查找又称为二分查找，是一种效率较高的查找方法。
 前提条件：查找表中的所有记录是按关键字有序(升序或降序) 。
 查找过程中，先确定待查找记录在表中的范围，然后逐步缩小范围(每次将待查记录所在区间缩小一半)，直到找到或找不到记录为止。

 1  查找思想
 用Low、High和Mid表示待查找区间的下界、上界和中间位置指针，初值为Low=1，High=n。
 ⑴   取中间位置Mid：Mid=Math.floor((Low+High)/2)；
 ⑵   比较中间位置记录的关键字与给定的K值：
 ①  相等： 查找成功；
 ②  大于：待查记录在区间的前半段，修改上界指针： High=Mid-1，转⑴ ；
 ③  小于：待查记录在区间的后半段，修改下界指针：Low=Mid+1，转⑴ ；
 直到越界(Low>High)，查找失败。

 2  算法分析
 ①  查找时每经过一次比较，查找范围就缩小一半，该过程可用一棵二叉树表示：
 ◆  根结点就是第一次进行比较的中间位置的记录；
 ◆ 排在中间位置前面的作为左子树的结点；
 ◆ 排在中间位置后面的作为右子树的结点；
 对各子树来说都是相同的。这样所得到的二叉树称为判定树(Decision Tree)。
 ②  将二叉判定树的第Math.floor(㏒2n)+1层上的结点补齐就成为一棵满二叉树，深度不变，h= Math.floor(㏒2(n+1)) 。
 ③  由满二叉树性质知，第i 层上的结点数为2i-1(i≤h) ，设表中每个记录的查找概率相等，即Pi=1/n，查找成功时的平均查找长度ASL：
 (n+1)/n*㏒2(n+1)-1
 当n很大 (n>50)时， ASL≈ ㏒2(n+1)-1。

 */

function binarySearch(sTable, key) {
    var low = 0;
    var high = sTable.length - 1;

    while (low <= high) {
        var mid = Math.floor((low + high) / 2);
        var elem = sTable[mid];

        if (key === elem) return mid;
        else if (key < elem) high = mid - 1;
        else low = mid + 1;
    }

    return -1;
}

console.log('binarySearch: ');
console.log(binarySearch([1, 2, 3, 4, 5], 1));  // 0

function binarySearchRecursive(sTable, key, low, high) {
    low = low || 0;
    high = high || sTable.length - 1;

    if (low > high) return -1;

    var mid = Math.floor((low + high) / 2);

    if (sTable[mid] === key) return mid;
    else if (sTable[mid] > key) return binarySearchRecursive(sTable, key, low, mid - 1);
    else return binarySearchRecursive(sTable, mid + 1, high);
}

console.log('binarySearchRecursive: ');
console.log(binarySearchRecursive([1, 2, 3, 4, 5], 1)); // 0
console.log(binarySearchRecursive([1, 2, 3, 4, 5], 6)); // -1


/*
 Fibonacci查找

 Fibonacci查找方法是根据Fibonacci数列的特点对查找表进行分割。Fibonacci数列的定义是：
 F(0)=0，F(1)=1，F(j)=F(j-1)+F(j-2) 。

 1  查找思想
 设查找表中的记录数比某个Fibonacci数小1，即设n=F(j)-1。用Low、High和Mid表示待查找区间的下界、上界和分割位置，初值为Low=0，High=n - 1。
 ⑴   取分割位置Mid：Mid=F(j-1) ；
 ⑵   比较分割位置记录的关键字与给定的K值：
 ① 相等： 查找成功；
 ②  大于：待查记录在区间的前半段(区间长度为F(j-1)-1)，修改上界指针： High=Mid-1，转⑴ ；
 ③  小于：待查记录在区间的后半段(区间长度为F(j-2)-1)，修改下界指针：Low=Mid+1，转⑴ ；直到越界(Low>High)，查找失败。

 2  算法实现
 在算法实现时，为了避免频繁计算Fibonacci数，可用两个变量f1和f2保存当前相邻的两个Fibonacci数，这样在以后的计算中可以依次递推计算出。

 由算法知，Fibonacci查找在最坏情况下性能比折半查找差，但折半查找要求记录按关键字有序；Fibonacci查找的优点是分割时只需进行加、减运算。

 */

function fib(n) {
    if (n === 0) return 0;
    if (n === 1) return 1;
    var f;
    var f0 = 0;
    var f1 = 1;
    for (var i = 2; i <= n; ++i) {
        f = f0 + f1;
        f0 = f1;
        f1 = f;
    }
    return f;
}

/**
 * 在有序表ST中用Fibonacci方法查找关键字为key的记录
 * @param sTable
 * @param key
 * @param n
 */
function fibonacciSearch(sTable, key, n) {
    n = n || sTable.length;
    var low = 0;
    var high = n - 1;
    var f1 = fib(n);
    var f2 = fib(n - 1);

    while (low <= high) {
        var mid = low + f1 - 1;
        if (sTable[mid] === key) return mid;
        else if (key < sTable[mid]) {
            high = mid - 1;
            f2 = f1 - f2;
            f1 = f1 - f2;
        } else {
            low = mid + 1;
            f1 = f1 - f2;
            f2 = f2 - f1;
        }
    }

    return -1;
}

console.log('fibonacciSearch: ');
console.log(fibonacciSearch([1, 2, 3, 4, 5], 5)); // 4
console.log(fibonacciSearch([1, 2, 3, 4, 5], 6)); // -1


/*
 静态次优查找树

 适合各记录的查找概率不等的情况

 查找效率最高即平均查找长度最小，根据前面所学知识，我们可以给出有序表在非等概率情况下应遵循的两个原则：

 1、最先访问的结点应是访问概率最大的结点；

 2、每次访问应使结点两边尚未访问的结点的被访概率之和尽可能相等。


 这两个原则可用一句话来表示，即判定树为带权内路径长度之和最小的二叉树，亦即：PH = ∑wihi  最小，其中 n 为有序表长度，hi 为第 i 个结点在判定树上的层次数，wi = cpi，c 为某个常数，pi 为第 i 个结点的查找概率。


 这样的树称为静态最优查找树（static optimal search tree），构造这样一棵树的时间代价太大，亦即时间复杂度很大，因此我们通常是构造次优查找树（nearly optimal search tree），构造它的时间代价远远低于构造最优查找树，但查找性能只比最优查找树差1%~2%，很少差3%以上。

 次优查找树的构造：

 设有序表每个记录的权值为 wl,wl+1,…,wh，第一个应访问的结点号为 i ，则有：
 Δpi =   ∑wj - ∑wj   最小，即 Δpi = Min {Δpj }
 再分别对 {rl,rl+1,…,ri-1} 和 {ri+1,ri+2,…,rh} 分别构造次优查找树
 */
var BinaryTree = require('../Binary tree/BinaryTree').BinaryTree;

/**
 * 由有序表sTable[low..high]及其累计权值表weights递归构造次优查找树
 * @param {BinaryTree} tree
 * @param {Array} sTable
 * @param {Array} sWeights
 * @param {Number} low
 * @param {Number} high
 */
function secondOptimal(tree, sTable, sWeights, low, high) {
    var i = low;
    var min = Math.abs(sWeights[high] - sWeights[low]);
    var dw = sWeights[high] + (sWeights[low - 1] || 0);

    // 选择最小的△Pi值
    for (var j = low + 1; j <= high; ++j) {
        var t = Math.abs(dw - sWeights[j] - sWeights[j - 1]);
        if (t < min) {
            i = j;
            min = t;
        }
    }

    // 调整树根权，选择邻近权值较大的关键字 todo 代码应该更简
    var a = 0, b, c = 0;
    if (i - 1 >= low)  b = sWeights[i] - sWeights[i - 1];
    if (i - 2 >= low) a = sWeights[i - 1] - sWeights[i - 2];
    if (i + 1 < high) c = sWeights[i + 1] - sWeights[i];
    if (typeof b === 'number') {
        if (a > c && a > b) {
            --i;
        } else if (a < c && c > b) {
            ++i;
        }
    }

    tree.data = sTable[i];
    //左子树
    if (i === low) tree.leftChild = null;
    else {
        tree.leftChild = new BinaryTree();
        secondOptimal(tree.leftChild, sTable, sWeights, low, i - 1);
    }
    // 右子树
    if (i === high) tree.rightChild = null;
    else {
        tree.rightChild = new BinaryTree();
        secondOptimal(tree.rightChild, sTable, sWeights, i + 1, high);
    }
}

var tree = new BinaryTree();
secondOptimal(tree, ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'], [1, 2, 4, 9, 12, 16, 20, 23, 28], 0, 8);
console.log(tree);


/**
 * 由有序表构造一棵次优查找树
 * @param {Object} obj 有序表，数据元素含有权域weight
 */
function createSOSTree(obj) {
    var tree;
    if (obj.elems.length === 0) tree = null;
    else {
        // 求累计权值表
        var sw = findSW(obj.weights);
        tree = new BinaryTree();
        secondOptimal(tree, obj.elems, sw, 0, obj.elems.length - 1);
    }

    return tree;
}

function findSW(sTable) {
    var sw = [sTable[0]];

    for (var i = 1; i < sTable.length; ++i) {
        sw[i] = sw[i - 1] + sTable[i];
    }

    return sw;
}

var sosTree = createSOSTree({
    elems: ['A', 'B', 'C', 'D', 'E'],
    weights: [1, 30, 2, 29, 3]
});
sosTree.preOrderTraverse(function (value) {
    console.log('inOrder: ' + value);
});


/*
 动态查找

 当查找表以线性表的形式组织时，若对查找表进行插入、删除或排序操作，就必须移动大量的记录，当记录数很多时，这种移动的代价很大。
 利用树的形式组织查找表，可以对查找表进行动态高效的查找。


 二叉排序树(BST)的定义

 二叉排序树(Binary Sort Tree或Binary Search Tree) 的定义为：二叉排序树或者是空树，或者是满足下列性质的二叉树。
 (1) ：若左子树不为空，则左子树上所有结点的值(关键字)都小于根结点的值；
 (2) ：若右子树不为空，则右子树上所有结点的值(关键字)都大于根结点的值；
 (3) ：左、右子树都分别是二叉排序树。
 结论：若按中序遍历一棵二叉排序树，所得到的结点序列是一个递增序列。


 BST树的查找
 1  查找思想
 首先将给定的K值与二叉排序树的根结点的关键字进行比较：若相等： 则查找成功；
 ① 给定的K值小于BST的根结点的关键字：继续在该结点的左子树上进行查找；
 ②   给定的K值大于BST的根结点的关键字：继续在该结点的右子树上进行查找。

 在随机情况下，二叉排序树的平均查找长度ASL和㏒(n)(树的深度)是等数量级的。


 BST树的插入

 在BST树中插入一个新结点，要保证插入后仍满足BST的性质。

 1 插入思想
 在BST树中插入一个新结点x时，若BST树为空，则令新结点x为插入后BST树的根结点；否则，将结点x的关键字与根结点T的关键字进行比较：
 ① 若相等： 不需要插入；
 ②  若x.key<T->key：结点x插入到T的左子树中；
 ③  若x.key>T->key：结点x插入到T的右子树中。

 由结论知，对于一个无序序列可以通过构造一棵BST树而变成一个有序序列。
 由算法知，每次插入的新结点都是BST树的叶子结点，即在插入时不必移动其它结点，仅需修改某个结点的指针。


 BST树的删除

 1  删除操作过程分析
 从BST树上删除一个结点，仍然要保证删除后满足BST的性质。设被删除结点为p，其父结点为f ，删除情况如下：
 ①  若p是叶子结点： 直接删除p。
 ②  若p只有一棵子树(左子树或右子树)：直接用p的左子树(或右子树)取代p的位置而成为f的一棵子树。即原来p是f的左子树，则p的子树成为f的左子树；原来p是f的右子树，则p的子树成为f的右子树。
 ③ 若p既有左子树又有右子树 ：处理方法有以下两种，可以任选其中一种。
 ◆  用p的直接前驱结点代替p。即从p的左子树中选择值最大的结点s放在p的位置(用结点s的内容替换结点p内容)，然后删除结点s。s是p的左子树中的最右边的结点且没有右子树，对s的删除同②。
 ◆ 用p的直接后继结点代替p。即从p的右子树中选择值最小的结点s放在p的位置(用结点s的内容替换结点p内容)，然后删除结点s。s是p的右子树中的最左边的结点且没有左子树，对s的删除同②。

 */

function BSTNode(data, leftChild, rightChild) {
    BinaryTree.apply(this, arguments);
}
BSTNode.prototype = {
    constructor: BSTNode,
    __proto__: BinaryTree.prototype,

    /**
     * BST树的查找（递归）
     * @param {*} key
     * @returns {*}
     */
    search: function (key) {
        if (this.data != null) {
            if (this.data === key) return this;
            else if (key < this.data) {
                if (this.leftChild) return this.search.call(this.leftChild, key);
            }
            else {
                if (this.rightChild) return this.search.call(this.rightChild, key);
            }
        }

        return null;
    },

    /**
     * BST树的查找（非递归）
     * @param {*} key
     * @returns {*}
     */
    search_nonRecurse: function (key) {
        if (this.data == null) return null;

        var p = this;
        while (p && p.data !== key) {
            if (key < p.data) p = p.leftChild;
            else p = p.rightChild;
        }

        if (!p || key !== p.data) return null;
        else return p;
    },

    /**
     * BST树的插入（递归）
     * @param {*} key
     */
    insert: function (key) {
        var node = new BSTNode(key, null, null);

        if (this.data == null) this.data = key;
        else {
            if (key === this.data) return;
            else if (key < this.data) {
                if (!this.leftChild) this.leftChild = node;
                this.insert.call(this.leftChild, key);
            } else {
                if (!this.rightChild) this.rightChild = node;
                this.insert.call(this.rightChild, key);
            }
        }
    },

    /**
     * BST树的插入（非递归）
     * @param {*} key
     */
    insert_nonRecurse: function (key) {
        var node = new BSTNode(key);

        if (this.data == null) this.data = key;
        else {
            var p = this;
            var q;
            while (p) {
                if (p.data === key) return;
                // q作为p的父节点
                q = p;
                if (key < p.data) p = p.leftChild;
                else p = p.rightChild;
            }

            if (key < q.data) q.leftChild = node;
            else q.rightChild = node;
        }
    },

    /**
     * 利用BST树的插入操作建立一棵BST树
     * @param {Array} arr
     * @param {Boolean|undefined} useNonRecurse 是否使用非递归
     */
    createBST: function (arr, useNonRecurse) {
        var i;
        if (useNonRecurse) {
            for (i = 0; i < arr.length; ++i)
                this.insert_nonRecurse(arr[i]);
        } else {
            for (i = 0; i < arr.length; ++i)
                this.insert(arr[i]);
        }

        return this;
    },

    /**
     * 使用递归的方法删除与关键字符合的结点
     * @param {*} key 需要查找的关键字
     * @param {BSTNode} parent 父节点，内部调用需要用到
     * @returns {Boolean}
     */
    'delete': function deleteBST(key, parent) {
        // 空结点的情况
        if (this.data == null) return false;
        else {
            // 找到关键字
            if (this.data === key) return deleteNode(this, parent);
            // 查找左子树，如果有的话
            else if (key < this.data) {
                if (this.leftChild) return deleteBST.call(this.leftChild, key, this);
            }
            // 查找右子树，如果有的话
            else {
                if (this.rightChild) return deleteBST.call(this.rightChild, key, this);
            }
        }

        // 未找到
        return false;
    },

    /**
     * 非递归删除与关键字符合的结点
     * @param {*} key 需要查找的关键字
     * @returns {boolean}
     */
    delete_nonRecurse: function (key) {
        var p = this;
        var f;

        while (p && p.data !== key) {
            f = p;
            if (key < p.data) p = p.leftChild;
            else p = p.rightChild;
        }

        // 没有要删除的结点
        if (!p) return false;

        // 找到了要删除的结点p
        var s = p;
        var q;
        // 如果有左右子树
        if (p.leftChild && p.rightChild) {
            f = p;
            s = p.leftChild;

            // 找到左子树的最大右子树，即仅小于左子树的值的结点
            while (s.rightChild) {
                f = s;
                s = s.rightChild;
            }

            p.data = s.data;
        }

        // 若s有左子树，右子树为空
        if (s.leftChild) q = s.leftChild;
        else q = s.rightChild;

        // 只有一个根结点的情况
        if (!f) this.data = null;
        else if (f.leftChild == s) f.leftChild = q;
        else f.rightChild = q;

        return true;
    },

    /**
     * 找到小于x的最大元素和大于x的最小元素
     * @param {String|Number} x
     * @returns {Array} [min, max]
     */
    findNeighborElem: function (x) {
        var last = typeof tree.data === 'number' ? -Infinity : 'a';
        var ret = [];

        void function recurse(tree, x) {
            if (tree.leftChild) recurse(tree.leftChild, x);
            if (last < x && tree.data >= x) ret[0] = last;
            if (last <= x && tree.data > x) ret[1] = tree.data;
            last = tree.data;
            if (tree.rightChild) recurse(tree.rightChild, x);
        }(this, x);

        return ret;
    },

    /**
     * 把二叉排序树bst合并到该树中
     * @param {BSTNode} bst
     */
    merge: function (bst) {
        if (bst.leftChild) this.merge(bst.leftChild);
        if (bst.rightChild) this.merge(bst.rightChild);
        this.insert(bst.data);
    },

    /**
     * 把结点插入到合适位置
     * @param {BSTNode} node 待插入的结点
     */
    insertNode: function insertNode(node) {
        if (this.data == null) {
            this.data = node.data;
        } else {
            if (node.data > this.data) {
                if (!this.rightChild) this.rightChild = node;
                else insertNode.call(this.rightChild, node);
            } else if (node.data < this.data) {
                if (!this.leftChild) this.leftChild = node;
                else insertNode.call(this.leftChild, node);
            }
        }

        node.leftChild = node.rightChild = null;
    },

    /**
     * 分裂为两棵二叉排序树
     * @param {*} x
     * @returns {BSTNode[a, b]} a的元素全部小于等于x，b的元素全部大于x
     */
    split: function (x) {
        var a = new BSTNode();
        var b = new BSTNode();

        void function split(tree, x) {
            if (tree.leftChild) split(tree.leftChild, x);
            if (tree.rightChild) split(tree.rightChild, x);
            if (tree.data <= x) a.insertNode(tree);
            else b.insertNode(tree);
        }(this, x);

        return [a, b];
    }
};

/**
 * 判断tree是否是二叉排序树
 * @param tree
 */
BSTNode.isBSTTree = function (tree) {
    var last = typeof tree.data === 'number' ? -Infinity : 'a';
    var flag = true;

    void function isBSTTree(tree) {
        if (tree.leftChild && flag) isBSTTree(tree.leftChild);
        if (tree.data < last) flag = false;
        last = tree.data;
        if (tree.rightChild && flag) isBSTTree(tree.rightChild);

    }(tree);

    return flag;
};

/**
 * 删除结点
 * @param {BSTNode} p 要删除的结点
 * @param {BSTNode} parent 要删除的结点的父节点
 * @returns {boolean} 返回删除成功
 */
function deleteNode(p, parent) {
    // 叶子结点或只有一个结点
    if (!p.leftChild && !p.rightChild) {
        // 当前结点是其父结点的左子树还是右子树
        var pos = parent && parent.leftChild == p ? 'leftChild' : 'rightChild';
        if (parent) parent[pos] = null;
        // 只有一个结点的情况
        else  p.data = null;
    }
    // 只有左子树
    else if (!p.rightChild) {
        p.data = p.leftChild.data;
        p.leftChild = p.leftChild.leftChild;
    }
    // 只有右子树
    else if (!p.leftChild) {
        p.data = p.rightChild.data;
        p.rightChild = p.rightChild.rightChild;
    }
    // 左右子树都有
    else {
        var s = p.leftChild;
        // q为父结点
        var q = p;
        // 找到左子树的最大右子树，即仅小于左子树的值的结点
        while (s.rightChild) {
            q = s;
            s = s.rightChild;
        }

        p.data = s.data;
        if (q != p) q.rightChild = s.leftChild;
        else q.leftChild = s.leftChild;
    }

    return true;
}

var bst = new BSTNode();
bst.createBST([45, 24, 53, 12, 24, 90]);
console.log(bst.search(12));
console.log(bst.search(13));

var bst2 = new BSTNode();
bst2.createBST([45, 24, 53, 12, 24, 90], true);
console.log(bst2.search_nonRecurse(12));
console.log(bst2.search_nonRecurse(13));

console.log('\nfindSiblingElem: ');
console.log(bst.findNeighborElem(12) + '');
console.log(bst.findNeighborElem(90) + '');
console.log(bst.findNeighborElem(45) + '');

console.log(bst['delete'](45));
console.log(bst['delete'](1));
console.log(bst['delete'](53));
console.log(bst['delete'](12));
console.log(bst['delete'](90));
console.log(bst['delete'](24));
console.log(bst['delete'](2));

//console.log(bst2.delete_nonRecurse(45));
//console.log(bst2.delete_nonRecurse(1));
//console.log(bst2.delete_nonRecurse(53));
//console.log(bst2.delete_nonRecurse(12));
//console.log(bst2.delete_nonRecurse(90));
//console.log(bst2.delete_nonRecurse(24));
//console.log(bst2.delete_nonRecurse(2));

console.log('\nisBSTTree: ');
console.log(BSTNode.isBSTTree(bst));
console.log(BSTNode.isBSTTree(sosTree));


/**
 * 从大到小输出二叉排序树中所有不小于x的元素
 * @param bst
 * @param x
 */
function printNotLessThan(bst, x) {
    if (bst.rightChild) printNotLessThan(bst.rightChild, x);
    if (bst.data < x) return;
    console.log(bst.data);
    if (bst.leftChild) printNotLessThan(bst.leftChild, x);
}

console.log('\nprintNotLessThan: ');
printNotLessThan(bst2, 90);
console.log('\n');
printNotLessThan(bst2, 12);


bst.merge(bst2);

var a1 = new BSTNode(5);
var a2 = new BSTNode(91);
bst2.insertNode(a1);
bst2.insertNode(a2);

bst2.split(45);


/*
 平衡二叉树(AVL)

 BST是一种查找效率比较高的组织形式，但其平均查找长度受树的形态影响较大，形态比较均匀时查找效率很好，形态明显偏向某一方向时其效率就大大降低。因此，希望有更好的二叉排序树，其形态总是均衡的，查找时能得到最好的效率，这就是平衡二叉排序树。

 平衡二叉排序树(Balanced Binary Tree或Height-Balanced Tree)是在1962年由Adelson-Velskii和Landis提出的，又称AVL树。

 平衡二叉树的定义
 平衡二叉树或者是空树，或者是满足下列性质的二叉树。
 ⑴：左子树和右子树深度之差的绝对值不大于1；
 ⑵：左子树和右子树也都是平衡二叉树。

 平衡因子(Balance Factor) ：二叉树上结点的左子树的深度减去其右子树深度称为该结点的平衡因子。

 因此，平衡二叉树上每个结点的平衡因子只可能是-1、0和1，否则，只要有一个结点的平衡因子的绝对值大于1， 该二叉树就不是平衡二叉树。
 如果一棵二叉树既是二叉排序树又是平衡二叉树，称为平衡二叉排序树(Balanced Binary Sort Tree) 。

 在平衡二叉排序树上执行查找的过程与二叉排序树上的查找过程完全一样，则在AVL树上执行查找时，和给定的K值比较的次数不超过树的深度。
 在平衡二叉排序树上进行查找的平均查找长度和㏒2n是一个数量级的，平均时间复杂度为O(㏒2n)。


 平衡化旋转

 一般的二叉排序树是不平衡的，若能通过某种方法使其既保持有序性，又具有平衡性，就找到了构造平衡二叉排序树的方法，该方法称为平衡化旋转。
 在对AVL树进行插入或删除一个结点后，通常会影响到从根结点到插入(或删除)结点的路径上的某些结点，这些结点的子树可能发生变化。以插入结点为例，影响有以下几种可能性
 ◆  以某些结点为根的子树的深度发生了变化；
 ◆ 某些结点的平衡因子发生了变化；
 ◆ 某些结点失去平衡。
 沿着插入结点上行到根结点就能找到某些结点，这些结点的平衡因子和子树深度都会发生变化，这样的结点称为失衡结点。

 1   LL型平衡化旋转

 ⑴ 失衡原因
 在结点a的左孩子的左子树上进行插入，插入使结点a失去平衡。a插入前的平衡因子是1，插入后的平衡因子是2。设b是a的左孩子，b在插入前的平衡因子只能是0，插入后的平衡因子是1(否则b就是失衡结点)。
 ⑵ 平衡化旋转方法
 通过顺时针旋转操作实现，用b取代a的位置，a成为b的右子树的根结点，b原来的右子树作为a的左子树。
 ⑶ 插入后各结点的平衡因子分析
 ① 旋转前的平衡因子
 设插入后b的左子树的深度为HbL，则其右子树的深度为HbL-1； a的左子树的深度为HbL+1。
 a的平衡因子为2，则a的右子树的深度为：
 HaR=HbL+1-2=HbL-1。

 ② 旋转后的平衡因子
 a的右子树没有变，而左子树是b的右子树，则平衡因子是：HaL- HaR=(HbL-1)-(HbL-1)=0
 即a是平衡的，以a为根的子树的深度是HbL。
 b的左子树没有变化，右子树是以a为根的子树，则平衡因子是： HbL-HbL=0
 即b也是平衡的，以b为根的子树的深度是HbL+1，与插入前a的子树的深度相同，则该子树的上层各结点的平衡因子没有变化，即整棵树旋转后是平衡的。


 2   LR型平衡化旋转

 ⑴ 失衡原因
 在结点a的左孩子的右子树上进行插入，插入使结点a失去平衡。a插入前的平衡因子是1，插入后a的平衡因子是2。设b是a的左孩子，c为b的右孩子， b在插入前的平衡因子只能是0，插入后的平衡因子是-1；c在插入前的平衡因子只能是0，否则，c就是失衡结点。

 ⑵ 插入后结点c的平衡因子的变化分析
 ①   插入后c的平衡因子是1：即在c的左子树上插入。设c的左子树的深度为HcL，则右子树的深度为HcL-1；b插入后的平衡因子是-1，则b的左子树的深度为HcL，以b为根的子树的深度是HcL+2。因插入后a的平衡因子是2 ，则a的右子树的深度是HcL。
 ② 插入后c的平衡因子是0：c本身是插入结点。设c的左子树的深度为HcL，则右子树的深度也是HcL；因b插入后的平衡因子是-1，则b的左子树的深度为HcL，以b为根的子树的深度是HcL+2；插入后a的平衡因子是2 ，则a的右子树的深度是HcL。
 ③ 插入后c的平衡因子是-1：即在c的右子树上插入。设c的左子树的深度为HcL，则右子树的深度为HcL+1 ，以c为根的子树的深度是HcL+2；因b插入后的平衡因子是-1，则b的左子树的深度为HcL+1，以b为根的子树的深度是HcL+3；则a的右子树的深度是HcL+1。

 ⑶ 平衡化旋转方法
 先以b进行一次逆时针旋转(将以b为根的子树旋转为以c为根)，再以a进行一次顺时针旋转。将整棵子树旋转为以c为根，b是c的左子树，a是c的右子树；c的右子树移到a的左子树位置， c的左子树移到b的右子树位置。

 ⑷ 旋转后各结点(a,b,c)平衡因子分析
 ① 旋转前 (插入后)c的平衡因子是1：
 a的左子树深度为HcL-1 ，其右子树没有变化，深度是HcL，则a的平衡因子是-1；b的左子树没有变化，深度为HcL，右子树是c旋转前的左子树，深度为HcL，则b的平衡因子是0； c的左、右子树分别是以b和a为根的子树，则c的平衡因子是0 。
 ② 旋转前 (插入后)c的平衡因子是0：
 旋转后a，b，c的平衡因子都是0 。
 ③  旋转前 (插入后)c的平衡因子是-1：
 旋转后a，b，c的平衡因子分别是0，-1，0 。
 综上所述，即整棵树旋转后是平衡的。


 3   RL型平衡化旋转

 ⑴ 失衡原因
 在结点a的右孩子的左子树上进行插入，插入使结点a失去平衡，与LR型正好对称。对于结点a，插入前的平衡因子是-1，插入后a的平衡因子是-2。设b是a的右孩子，c为b的左孩子， b在插入前的平衡因子只能是0，插入后的平衡因子是1；同样，c在插入前的平衡因子只能是0，否则，c就是失衡结点。

 ⑵ 插入后结点c的平衡因子的变化分析
 ①   插入后c的平衡因子是1：在c的左子树上插入。设c的左子树的深度为HcL，则右子树的深度为HcL-1。因b插入后的平衡因子是1，则其右子树的深度为HcL，以b为根的子树的深度是HcL+2；因插入后a的平衡因子是-2 ，则a的左子树的深度是HcL。
 ② 插入后c的平衡因子是0：c本身是插入结点。设c的左子树的深度为HcL，则右子树的深度也是HcL；因b插入后的平衡因子是1，则b的右子树的深度为HcL，以b为根的子树的深度是HcL+2；因插入后a的平衡因子是-2 ，则a的左子树的深度是HcL。
 ③  插入后c的平衡因子是-1：在c的右子树上插入。设c的左子树的深度为HcL，则右子树的深度为HcL+1 ，以c为根的子树的深度是HcL+2；因b插入后的平衡因子是1，则b的右子树的深度为HcL+1，以b为根的子树的深度是HcL+3；则a的右子树的深度是HcL+1。

 ⑶ 平衡化旋转方法
 先以b进行一次顺时针旋转，再以a进行一次逆时针旋转。即将整棵子树(以a为根)旋转为以c为根，a是c的左子树，b是c的右子树；c的右子树移到b的左子树位置，c的左子树移到a的右子树位置。

 ⑷ 旋转后各结点(a,b,c)的平衡因子分析
 ① 旋转前 (插入后)c的平衡因子是1：
 a的左子树没有变化，深度是HcL，右子树是c旋转前的左子树，深度为HcL，则a的平衡因子是0；b的右子树没有变化，深度为HcL，左子树是c旋转前的右子树，深度为HcL-1 ，则b的平衡因子是-1； c的左、右子树分别是以a 和b为根的子树，则c的平衡因子是0 。
 ② 旋转前 (插入后)c的平衡因子是0：
 旋转后a，b，c的平衡因子都是0 。
 ③  旋转前 (插入后)c的平衡因子是-1：
 旋转后a，b，c的平衡因子分别是1，0，0 。

 综上所述，即整棵树旋转后是平衡的。


 4  RR型平衡化旋转

 ⑴ 失衡原因
 在结点a的右孩子的右子树上进行插入，插入使结点a失去平衡。要进行一次逆时针旋转，和LL型平衡化旋转正好对称。

 ⑵ 平衡化旋转方法
 设b是a的右孩子，通过逆时针旋转实现。用b取代a的位置，a作为b的左子树的根结点，b原来的左子树作为a的右子树。



 对于上述四种平衡化旋转，其正确性容易由“遍历所得中序序列不变”来证明。并且，无论是哪种情况，平衡化旋转处理完成后，形成的新子树仍然是平衡二叉排序树，且其深度和插入前以a为根结点的平衡二叉排序树的深度相同。所以，在平衡二叉排序树上因插入结点而失衡，仅需对失衡子树做平衡化旋转处理。



 平衡二叉排序树的插入

 平衡二叉排序树的插入操作实际上是在二叉排序插入的基础上完成以下工作：
 ⑴：判别插入结点后的二叉排序树是否产生不平衡?
 ⑵：找出失去平衡的最小子树；
 ⑶：判断旋转类型，然后做相应调整。
 失衡的最小子树的根结点a在插入前的平衡因子不为0，且是离插入结点最近的平衡因子不为0的结点。
 若a失衡，从a到插入点的路径上的所有结点的平衡因子都会发生变化，在该路径上还有一个结点的平衡因子不为0且该结点插入后没有失衡，其平衡因子只能是由1到0或由-1到0，以该结点为根的子树深度不变。该结点的所有祖先结点的平衡因子也不变，更不会失衡。

 1 算法思想(插入结点的步骤)
 ①：按照二叉排序树的定义，将结点s插入；
 ②：在查找结点s的插入位置的过程中，记录离结点s最近且平衡因子不为0的结点a，若该结点不存在，则结点a指向根结点；
 ③： 修改结点a到结点s路径上所有结点的；
 ④：判断是否产生不平衡，若不平衡，则确定旋转类型并做相应调整。

 */

var LH = 1;     // 左高
var EH = 0;     // 等高
var RH = -1;    // 右高

/**
 * AVL树，平衡二叉排序树
 * @param {*} data
 * @param {BBSTNode} leftChild
 * @param {BBSTNode} rightChild
 * @param {Number} balanceFactor 平衡因子
 * @constructor
 */
function BBSTNode(data, leftChild, rightChild, balanceFactor) {
    BinaryTree.call(this, data, leftChild, rightChild);
    this.balanceFactor = balanceFactor;
}
exports.BBSTNode = BBSTNode;
exports.AVLNode = BBSTNode;
BBSTNode.prototype = {
    constructor: BBSTNode,
    __proto__: BinaryTree.prototype,

    rotate_LL: function () {
        var b = this.leftChild;
        this.leftChild = b.rightChild;
        b.rightChild = this;
        this.balanceFactor = b.balanceFactor = 0;

        return b;
    },

    rotate_LR: function () {
        var b = this.leftChild;
        var c = b.rightChild;
        this.leftChild = c.rightChild;
        b.rightChild = c.leftChild;
        c.leftChild = b;
        c.rightChild = this;

        if (c.balanceFactor === 1) {
            this.balanceFactor = -1;
            b.balanceFactor = 0;
        } else if (c.balanceFactor === 0) {
            this.balanceFactor = b.balanceFactor = 0;
        } else {
            this.balanceFactor = 0;
            b.balanceFactor = 1;
        }

        return c;
    },

    rotate_RL: function () {
        var b = this.rightChild;
        var c = b.leftChild;
        this.rightChild = c.leftChild;
        b.leftChild = c.rightChild;
        c.rightChild = b;
        c.leftChild = this;

        if (c.balanceFactor === 1) {
            this.balanceFactor = 0;
            b.balanceFactor = -1;
        } else if (c.balanceFactor === 0) {
            this.balanceFactor = b.balanceFactor = 0;
        } else {
            this.balanceFactor = 1;
            b.balanceFactor = 0;
        }

        return c;
    },

    rotate_RR: function () {
        var b = this.rightChild;
        this.rightChild = b.leftChild;
        b.leftChild = this;
        this.balanceFactor = b.balanceFactor = 0;

        return b;
    },

    insert: function (elem) {
        if (this.data == null) {
            this.data = elem;
            this.leftChild = this.rightChild = null;
            this.balanceFactor = 0;
            return;
        }

        var s = new BBSTNode(elem, null, null, 0);
        // a指向离s最近且平衡因子不为0的结点
        var a = this;
        var p = this;
        // f指向a的父结点
        var f = null;
        // q指向p的父结点
        var q = null;

        // 找插入位置q结点
        while (p) {
            // 结点已存在
            if (s.data === p.data) return;

            if (p.balanceFactor !== 0) {
                a = p;
                f = q;
            }
            q = p;

            if (s.data < p.data) p = p.leftChild;
            else p = p.rightChild;
        }

        // s插入到q结点的左或右子树
        if (s.data < q.data) q.leftChild = s;
        else q.rightChild = s;

        p = a;

        // 改变最近且平衡因子不为0的结点到插入结点的路径所有结点平衡因子
        // 插入到左子树，平衡因子加1，右子树平衡因子减1
        while (p != s) {
            if (s.data < p.data) {
                ++p.balanceFactor;
                p = p.leftChild;
            } else {
                --p.balanceFactor;
                p = p.rightChild;
            }
        }

        // 未失平衡，不做调整
        if (a.balanceFactor > -2 && a.balanceFactor < 2) return;

        // 根据情况做旋转平衡
        var b;
        if (a.balanceFactor === 2) {
            b = a.leftChild;
            if (b.balanceFactor === 1) p = a.rotate_LL();
            else p = a.rotate_LR();
        } else {
            b = a.rightChild;
            if (b.balanceFactor === 1) p = a.rotate_RL();
            else p = a.rotate_RR();
        }

        // todo 这里存在循环引用，导致bug了。。
        // p为根结点
        if (!f) {
            this.data = p.data;
            this.leftChild = p.leftChild;
            this.rightChild = p.rightChild;
            this.balanceFactor = p.balanceFactor;
        } else if (f.leftChild == a) f.leftChild = p;
        else f.rightChild = p;
    }
};

var test = new BBSTNode();
test.insert(3);
test.insert(14);
test.insert(25);
test.insert(81);
test.insert(44);